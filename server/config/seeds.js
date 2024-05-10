const db = require('./connection');
const { User, Product, Category, Show } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');
  await cleanDB('Show', 'shows');

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Sal',
    lastName: 'X',
    email: 'sal@hotmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Lernantino',
    lastName: 'X',
    email: 'lernantino@gmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Amiko',
    lastName: 'X',
    email: 'amiko2k20@aol.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Xandromus',
    lastName: 'X',
    email: 'xandro@aol.com',
    password: 'password12345'
  });

  console.log('users seeded');

  // generate venues and shows -----------------------------------------------------------------//

  const shows = await Show.insertMany([
    {
      name: 'Coldplay: Music of the Spheres World Tour',
      description:
        'The "Music of the Spheres World Tour" is the eighth concert tour by British rock band Coldplay, in support of their album "Music of the Spheres". Coldplay is known for their captivating live performances featuring elaborate stage designs, stunning visual effects, and energetic renditions of their hit songs. Tour surpassed $810.9 million in revenue from 7.66 million tickets across 132 dates, making it the third-highest-grossing and second-most attended tour of all time. Featuring live performance of hit track such as "Higher Power", "Coloratura", and "My Universe" ',
      image: 'cookie-tin.jpg',
      price: 32.99,
      venue: [

        {
          name: 'RAC Arena, Perth',
          time: [
            { time: new Date('2024-08-09T20:10:00.000Z') },
            { time: new Date('2024-08-10T20:50:00.000Z') },
          ]
        },

        {
          name: 'Adelaide Entertainment Centre, Adelaide',
          time: [
            { time: new Date('2024-09-01T21:20:00.000Z') },
            { time: new Date('2024-09-02T19:15:00.000Z') },
          ]
        },

        {
          name: 'Marvel Stadium, Melbourne',
          time: [
            { time: new Date('2024-11-05T18:30:00.000Z') },
            { time: new Date('2024-11-06T17:45:00.000Z') },
          ]
        },
      ]
    },

    {
      name: 'Iron Maiden: Future Past World Tour',
      description:
        'The "Future Past World Tour" is an ongoing concert tour by English heavy metal band, Iron Maiden, in support of their seventeenth studio album "Senjutsu" and their 1996 album "Somewhere in Time". Iron Maiden is a British heavy metal band that has become one of the most influential and enduring acts in the history of rock music. The band is known for its known for their complex compositions, featuring galloping rhythms, dueling guitar solos, and operatic vocals, as well as their elaborate stage shows. Featuring live performance of hit track such as "Stratego", "The Writing on the Wall", and "Days of Future Past"',
      image: 'soap.jpg',
      price: 109.99,
      venue: [

        {
          name: 'RAC Arena, Perth',
          time: [
            { time: new Date('2024-08-09T20:10:00.000Z') },
            { time: new Date('2024-08-10T20:50:00.000Z') },
          ]
        },

        {
          name: 'Adelaide Entertainment Centre, Adelaide',
          time: [
            { time: new Date('2024-09-01T21:20:00.000Z') },
            { time: new Date('2024-09-02T19:15:00.000Z') },
          ]
        },

        {
          name: 'Rod Laver Arena, Melbourne',
          time: [
            { time: new Date('2024-11-05T18:20:00.000Z') },
            { time: new Date('2024-11-06T17:45:00.000Z') },
          ]
        },

        {
          name: 'Brisbane Entertainment Centre, Brisbane',
          time: [
            { time: new Date('2024-11-05T18:20:00.000Z') },
            { time: new Date('2024-11-06T17:50:00.000Z') },
          ]
        },

        {
          name: 'Qudos Bank Arena, Sydney',
          time: [
            { time: new Date('2024-11-05T18:30:00.000Z') },
            { time: new Date('2024-11-06T17:45:00.000Z') },
          ]
        },
      ]
    },

    {
      name: 'Sia: Reasonable Woman Concert Tour',
      description:
        'The "Reasonable Woman Tour" is the sixth concert tour by Australian artist Sia, in support of her tenth studio album, "Reasonable Woman." Sia is renowned for her powerful vocals and emotive stage presence. Her concerts feature high-energy choreography, stunning visuals, and an immersive atmosphere. The concert features live performance of tracks such as "Incredible", "Gimme Love", and "Dance Alone". ',
      image: 'tablet.jpg',
      price: 97.99,

      venue: [
        {
          name: 'AAMI Park, Melbourne',
          time: [
            { time: new Date('2024-08-09T20:10:00.000Z') },
            { time: new Date('2024-09-10T21:10:00.000Z') },
          ]
        },
        {
          name: 'Allianz Stadium, Adelaide, Sydney',
          time: [
            { time: new Date('2024-10-01T21:20:00.000Z') },
            { time: new Date('2024-11-02T19:15:00.000Z') },
          ]
        },
      ]
    },

    {
      name: 'Dua Lipa: Radical Optimism Tour',
      description:
        'The "Radical Optimism Tour" is an global concert tour by English/Albanian singer-songwriter Dua Lipa, in support of her third studio album, "Radical Optimism." pop anthems with retro flair and a modern twist. Dua Lipa is known for her powerful vocals, energetic performances, and catchy pop anthems with retro flair and a modern twist. The concert features live performance of tracks such as "Houdini", "Training Season", and "Illusion". ',
      image: 'camera.jpg',
      price: 104.99,
      venue: [

        {
          name: 'RAC Arena, Perth',
          time: [
            { time: new Date('2024-11-09T20:10:00.000Z') },
            { time: new Date('2024-11-10T20:50:00.000Z') },
          ]
        },

        {
          name: 'Adelaide Entertainment Centre, Adelaide',
          time: [
            { time: new Date('2024-12-01T21:20:00.000Z') },
            { time: new Date('2024-09-02T19:15:00.000Z') },
          ]
        },

        {
          name: 'Rod Laver Arena, Melbourne',
          time: [
            { time: new Date('2024-05-05T18:20:00.000Z') },
            { time: new Date('2024-06-06T17:45:00.000Z') },
          ]
        },

        {
          name: 'Brisbane Entertainment Centre, Brisbane',
          time: [
            { time: new Date('2024-02-05T18:20:00.000Z') },
            { time: new Date('2024-03-06T17:50:00.000Z') },
          ]
        },

        {
          name: 'Qudos Bank Arena, Sydney',
          time: [
            { time: new Date('2024-11-05T18:30:00.000Z') },
            { time: new Date('2024-08-06T17:45:00.000Z') },
          ]
        },
      ]

    },


  ]);

  console.log('shows seeded');


  process.exit();
});
