import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const processMessage = async (message, userId = null) => {
  const normalizedMessage = message.toLowerCase();
  
  const keywords = {
    precio: ['precio', 'costo', 'vale', 'cuanto', 'cuánto', 'valor'],
    productos: ['productos', 'ropa', 'artículos', 'articulos', 'disponible', 'hay', 'stock'],
    tallas: ['talla', 'size', 'medida', 'tamaño'],
    categorias: ['categoria', 'categoría', 'tipo'],
    orden: ['orden', 'pedido', 'compra', 'status', 'estado'],
    bestseller: ['popular', 'más vendido', 'mas vendido', 'bestseller', 'mejor vendido']
  };

  try {
    if (keywords.orden.some(kw => normalizedMessage.includes(kw)) && userId) {
      const orders = await orderModel.find({ userId });
      if (orders.length === 0) {
        return 'No tienes órdenes activas en este momento.';
      }
      
      return orders.map(order => 
        `Orden del ${new Date(order.date).toLocaleDateString()}:\n` +
        `Estado: ${order.status}\n` +
        `Total: $${order.amount}\n` +
        `Método de pago: ${order.paymentMethod}\n` +
        `Pagado: ${order.payment ? 'Sí' : 'No'}`
      ).join('\n\n');
    }

    let query = {};
    let searchTerms = normalizedMessage.split(' ');

    const categories = await productModel.distinct('category');
    const mentionedCategory = categories.find(cat => 
      normalizedMessage.includes(cat.toLowerCase())
    );
    if (mentionedCategory) {
      query.category = mentionedCategory;
    }

    query.$or = [
      { name: { $regex: searchTerms.join('|'), $options: 'i' } },
      { description: { $regex: searchTerms.join('|'), $options: 'i' } }
    ];

    const products = await productModel.find(query);

    if (products.length === 0) {
      return 'Lo siento, no encontré productos que coincidan con tu búsqueda. ¿Podrías ser más específico?';
    }

    if (keywords.precio.some(kw => normalizedMessage.includes(kw))) {
      return products.map(p => 
        `${p.name} - $${p.price}`
      ).join('\n');
    }

    if (keywords.tallas.some(kw => normalizedMessage.includes(kw))) {
      return products.map(p => 
        `${p.name} - Tallas disponibles: ${p.sizes.join(', ')}`
      ).join('\n');
    }

    return products.map(p => 
      `${p.name}\n` +
      `Precio: $${p.price}\n` +
      `Categoría: ${p.category}\n` +
      `Tallas: ${p.sizes.join(', ')}`
    ).join('\n\n');

  } catch (error) {
    console.error('Error processing message:', error);
    return 'Lo siento, ocurrió un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.';
  }
};

export const handlerChatbotMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const response = await processMessage(message, userId);
    res.json({ response });
  } catch (error) {
    console.error('Error in chatbot handler:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      response: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.'
    });
  }
};