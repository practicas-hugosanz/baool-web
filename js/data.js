/* Contenido de Baool: burgers destacadas, carta por local y reseñas.
   Fuente: restaurantebaool.es (carta Calle Costera y Calle Conchita Piquer). */
window.BAOOL = {
  featured: [
    { name: 'Marquesita', tag: 'La más viral', img: 'marquesita', price: '13,50', desc: 'Mermelada de tomate, bacón, cheddar en dos texturas, salsa Lotus y lluvia de parmesano.' },
    { name: 'TNT', tag: 'Campeona', img: 'tnt', price: '14,00', desc: 'New York Roll, mermelada de bacón, crema de cheddar madurado y Peta Zetas.' },
    { name: 'Emmy', tag: 'La favorita', img: 'emmy', price: '12,50', desc: 'Bacón, cheddar en dos texturas, cebolla caramelizada, pepinillo, sésamo y salsa Emmy.' },
    { name: 'Conchita', tag: 'Crujiente', img: 'conchita', price: '12,50', desc: 'Ternera deshilada, cheddar en dos texturas, cebolla crujiente y salsa de ajo.' },
    { name: 'Rabiosa', tag: 'Umami', img: 'rabiosa', price: '13,50', desc: 'Carrillera de ternera, cebolla morada, cheddar en dos texturas y salsa miso.' },
    { name: 'Pollita', tag: 'Crispy', img: 'pollita', price: '9,60', desc: 'Pollo crispí, cheddar en dos texturas, bacón, lechuga, tomate y mayoBBQ.' },
    { name: 'Chapulina', tag: 'Con tajín', img: 'chapulina', price: '13,50', desc: 'Carne deshilada, cheddar ahumado en dos texturas, guacamole, jalapeño y tajín.' },
    { name: 'Juliana', tag: 'Se quedó en carta', img: 'juliana', price: '13,50', desc: 'Cheddar blanco ahumado, bacón caramelizado, parmesano, salsa mayobacon y pistacho.' },
    { name: 'Burvege', tag: 'Veggie', img: 'burvege', price: '10,50', desc: 'Cheddar en dos texturas, guacamole, berenjena y lechuga.' }
  ],

  menu: {
    costera: {
      burgers: [
        ['Cheeseburger', '200 g de carne madurada, cheddar, cheddar ahumado y nuestra salsa camembert.', '9,50', 'cheeseburger'],
        ['Baool', '200 g de carne madurada, cheddar en dos texturas, cebolla en lima y salsa mayoBBQ.', '9,50', 'baool-burger'],
        ['Única', '200 g de carne madurada, cheddar ahumado, bacón, cebolla caramelizada y salsa mayo-bacón.', '9,80', 'unica'],
        ['Oklahoma', '200 g de carne madurada, cebolla pochada, cheddar ahumado en dos texturas y mayoBBQ.', '11,50', 'oklahoma'],
        ['Conchita', '200 g de carne madurada, ternera deshilada, cheddar en dos texturas, cebolla crujiente y salsa de ajo.', '12,50', 'conchita'],
        ['Emmy', '200 g de carne madurada, bacón, cheddar en dos texturas, cebolla caramelizada, pepinillo, sésamo y salsa Emmy.', '12,50', 'emmy'],
        ['Atlética', '200 g de carne madurada y tacos de cecina de León en una piscina de cheddar ahumado.', '12,50', 'atletica'],
        ['Big Smac', '200 g de carne madurada, cheddar ahumado en dos texturas, pepinillo, cebolla, lechuga y salsa big smac.', '12,50', 'bigsmac'],
        ['Rabiosa', '200 g de carne madurada, carrillera de ternera, cebolla morada, cheddar en dos texturas y salsa miso.', '13,50', 'rabiosa'],
        ['Marquesita', '200 g de carne madurada, mermelada de tomate, bacón, cheddar en dos texturas, salsa Lotus y lluvia de parmesano.', '13,50', 'marquesita', 'Viral'],
        ['Roro', 'Burger del mes. Cheddar blanco ahumado, cheddar líquido, ternera a baja temperatura, bacón caramelizado, cebolla, pepinillo y salsa de cacahuete.', '13,50', 'roro', 'Del mes'],
        ['Juliana', 'La burger de julio que tuvo que quedarse. Cheddar blanco ahumado, cheddar líquido, bacón caramelizado, parmesano, salsa mayobacon y pistacho.', '13,50', 'juliana'],
        ['Chapulina', '200 g de carne madurada, carne deshilada, cheddar ahumado en dos texturas, guacamole, jalapeño y tajín.', '13,50', 'chapulina'],
        ['TNT', 'New York Roll, 200 g de carne madurada, mermelada de bacón, crema de cheddar madurado y Peta Zetas.', '14,00', 'tnt', 'Campeona'],
        ['Pollita', 'Pollo crispí, cheddar en dos texturas, bacón, lechuga, tomate y mayoBBQ.', '9,60', 'pollita'],
        ['Burvege', 'Con cheddar en dos texturas, guacamole, berenjena y lechuga.', '10,50', 'burvege', 'Veggie'],
        ['Kids', 'Cheeseburger y patatas fritas.', '9,00', null],
        ['Patatas', 'Guarnición.', '1,90', 'patatas'],
        ['Boniato', 'Guarnición.', '3,00', 'boniato']
      ],
      entrantes: [
        ['Croqueta de jamón o carrillera', 'Auténticas y caseras. Por unidad.', '2,50', 'croqueta'],
        ['Taco de ternera', 'Ternera deshilada, crema agria, guacamole y pico de gallo.', '3,90', 'taco'],
        ['Palitos de queso', 'Seis deditos de harina de trigo con mucho queso.', '9,80', 'palitos'],
        ['Lágrimas de pollo', 'Tiras de pollo con un rebozado especial.', '9,90', 'lagrimas'],
        ['Nachos', 'Caseros con ternera, guacamole, mozzarella, cheddar líquido, crema agria, crema de frijol y pico de gallo.', '13,50', 'nachos', 'Especial'],
        ['Pull pork fries', 'Patatas, carne a baja temperatura, cheddar líquido, cebolla morada y cebollino.', '9,50', 'pullpork'],
        ['Patatas azules', 'Patata y boniato con mix de quesos, pollo rebozado, cebolla caramelizada y cebollino.', '9,50', 'patatas-azules'],
        ['Bravas', 'Caseras con nuestra salsa chipotle, cebollino y alioli negro.', '8,50', 'bravas'],
        ['Bao de ternera', 'Carne a baja temperatura, cebolla caramelizada, cebollino y mayoBBQ.', '4,50', 'bao-ternera'],
        ['Bao de secreto', 'Secreto ibérico, cebolla morada, salsa hoisin y brotes.', '4,50', 'bao-secreto']
      ],
      postres: [
        ['Tarta de queso con Lotus', 'Con crema y polvo de Lotus.', '6,50', null],
        ['Tarta de queso con pistacho', 'Con crema y polvo de pistacho.', '6,50', null],
        ['Coulant', 'Cremosito de chocolate con helado de vainilla y polvo de galleta Oreo.', '5,50', null],
        ['Brownie', 'Bizcochito con helado de vainilla y polvo de Lotus y Oreo.', '5,50', null]
      ],
      bebidas: [
        ['Caña Turia', 'La cerveza de Valencia. También doble (2,80 €) y pinta (3,80 €).', '2,00', 'cerveza'],
        ['Caña Estrella Damm', 'También doble (2,50 €) y pinta (3,80 €).', '1,75', 'cerveza'],
        ['Tinto de verano', 'Casero y refrescante.', '3,50', null],
        ['Mojito clásico', 'Fresquito, con lima y menta. De fresa: 7,50 €.', '7,00', null],
        ['Aperol Spritz', 'Auténtico y delicioso.', '6,00', null],
        ['Pisco sour', 'Ligeramente cítrico.', '7,00', null],
        ['Margarita clásica o de fresa', '', '7,00', null],
        ['Vermouth Perucchi', 'Vermouth artesano.', '5,00', null],
        ['Refrescos', 'Coca-Cola, Zero, Aquarius, Nestea, Fanta, Sprite.', '2,80', null],
        ['Copa de vino', 'Tinto: Madame Monastrell o Tunante Rioja. Blanco: Madame Merseguera o Rey Santo.', '3,00', null],
        ['Capuccino', 'Con chocolate y canela.', '2,50', 'cafe']
      ]
    },
    smash: {
      burgers: [
        ['Conchita', 'Doble smash de 100 g, ternera deshilada, cheddar en dos texturas, cebolla crujiente y salsa de ajo.', '11,50', 'conchita'],
        ['Emmy', 'Doble smash de 100 g, bacón, cheddar en dos texturas, cebolla caramelizada, pepinillo, sésamo y salsa Emmy.', '11,50', 'emmy'],
        ['Big Smac', 'Doble smash de 100 g, cheddar ahumado en dos texturas, pepinillo, cebolla, lechuga y salsa big smac.', '11,50', 'bigsmac'],
        ['Marquesita', 'Doble smash de 100 g, mermelada de tomate, bacón, cheddar en dos texturas, salsa Lotus y lluvia de parmesano.', '13,50', 'marquesita', 'Viral'],
        ['Roro', 'Burger del mes. Doble smash, cheddar blanco ahumado, cheddar líquido, ternera a baja temperatura, bacón caramelizado, cebolla, pepinillo y salsa de cacahuete.', '12,50', 'roro', 'Del mes'],
        ['Chapulina', 'Doble smash de 100 g, carne deshilada, cheddar ahumado en dos texturas, guacamole, jalapeño y tajín.', '12,50', 'chapulina'],
        ['Cheeseburger', 'Doble smash de 100 g, cheddar, cheddar ahumado y salsa camembert.', '9,50', 'cheeseburger'],
        ['Única', 'Doble smash de 100 g, cheddar ahumado, bacón, cebolla caramelizada y salsa mayo-bacón.', '9,90', 'unica'],
        ['Oklahoma', 'Doble smash de 100 g, cebolla pochada, cheddar ahumado en dos texturas y mayoBBQ.', '8,50', 'oklahoma'],
        ['Baool', 'Doble smash de 100 g, cheddar en dos texturas, cebolla en lima y salsa mayoBBQ.', '8,50', 'baool-burger'],
        ['Triple Bacon', 'Doble smash de 100 g, triple bacón ahumado, cheddar líquido, mayonesa y ketchup.', '8,50', 'triple-bacon'],
        ['Pollita', 'Pollo crispí, cheddar en dos texturas, bacón, lechuga, tomate y mayoBBQ.', '9,60', 'pollita'],
        ['Burvege', 'Con cheddar en dos texturas, guacamole, berenjena y lechuga.', '10,50', 'burvege', 'Veggie'],
        ['Kids', 'Cheeseburger smash y patatas fritas.', '9,00', null],
        ['Patatas', 'Guarnición.', '1,90', 'patatas'],
        ['Boniato', 'Guarnición.', '3,00', 'boniato']
      ],
      entrantes: [
        ['Palitos de queso', 'Seis deditos de harina de trigo con mucho queso.', '8,50', 'palitos'],
        ['Lágrimas de pollo', 'Tiras de pollo con un rebozado especial.', '8,50', 'lagrimas'],
        ['Nachos', 'Caseros con ternera, guacamole, mozzarella, cheddar líquido, crema agria, crema de frijol y pico de gallo.', '10,50', 'nachos', 'Especial'],
        ['Pull pork fries', 'Patatas, carne a baja temperatura, cheddar líquido, cebolla morada y cebollino.', '9,50', 'pullpork'],
        ['Patatas azules', 'Patata y boniato con cheddar líquido, crema de queso azul, pollo rebozado, parmesano, cebolla caramelizada y cebollino.', '9,50', 'patatas-azules'],
        ['Bravas', 'Caseras con nuestra salsa chipotle, cebollino y alioli negro.', '8,50', 'bravas']
      ],
      postres: null,  // mismos postres que Costera
      bebidas: null
    }
  },

  notes: {
    burgers: 'Pan sin gluten +1 € · Vegana (Beyond Burger) +2 € · Patatas y boniato se piden aparte',
    entrantes: 'Para compartir (o no).',
    postres: 'Quesito y chocolatito, hechos en casa.',
    bebidas: 'Carta de vinos completa en el local: D.O. Valencia, Rioja, Ribera, Rueda, Rías Baixas.'
  },

  reviews: [
    ['Alicia Sarah', 'Escogimos un entrante y dos hamburguesas y salimos rodando. Pedimos la Rabiosa y la Atlética, las dos tremendas, con la carne al punto y mucho sabor.'],
    ['Esther Muñoz', 'Pedimos la Emmy y la Única, las dos de las mejores que hemos probado. El personal de 10. Volveremos sin duda.'],
    ['Ana SC', 'Camareras súper amables y la cena de 10. Hamburguesas muy originales y al punto.'],
    ['Gaby Herrerías', '¡Nos encantó! Probamos la Big Smac, la Pollita y el boniato frito, todo excepcional. La camarera de la terraza nos hizo sentir como en casa.'],
    ['Pauli Crespo', 'Muy buena comida y muy buen ambiente del local. ¡Los dueños unos genios!'],
    ['Oliver Schüttler', 'Super tolles, mega leckeres authentisches Essen! Tomi, Rebecca und Pau waren unglaublich.'],
    ['Maria Nieto', 'Croquetas de carrillera, tacos de ternera, una Pollita y una Rabiosa. Muy buenas y con bastante cantidad.']
  ]
};
