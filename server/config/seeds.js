const db = require('./connection');
const { User, Product, Category, Show } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
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

    console.log('🔠 categories seeded');

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

    console.log('📦 products seeded');

    // generate venues and shows -----------------------------------------------------------------//

    const shows = await Show.insertMany([
      {
        name: 'Coldplay: Music of the Spheres World Tour',
        description:
          'The "Music of the Spheres World Tour" is the eighth concert tour by British rock band Coldplay, in support of their album "Music of the Spheres". Coldplay is known for their captivating live performances featuring elaborate stage designs, stunning visual effects, and energetic renditions of their hit songs. Tour surpassed $810.9 million in revenue from 7.66 million tickets across 132 dates, making it the third-highest-grossing and second-most attended tour of all time. Featuring live performance of hit tracks such as "Higher Power", "Coloratura", and "My Universe" ',
        ticketBannerImg: 'banner-C.jpg',
        ticketDesc: 'Produced by Live Nation, the Music of the Spheres delivers a show in four Act structure audio-visually representing a journey into the unknown. British rock band Coldplay have been praised for their musicianship, stage presence, joyfulness, and production value. The show production has notably endeavoured to reduce its carbon footprint, whilst not sacrificing the production quality of the show.',
        image: 'Cimage.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=hZDJjSHHGok',
        price: 120.99,
        ticketQuant: 5,

        // seed thoughts into show -----------------------------------------------------------------//

        thoughts: [
          {
            thoughtText: "I saw Coldplay at Marvel Stadium and it was incredible!",
            thoughtAuthor: "Amiko",
            createdAt: new Date('2024-05-12T10:00:00Z'),
          },
          {
            thoughtText: "Coldplay's Music of the Spheres World Tour was the highlight of the year!",
            thoughtAuthor: "David",
            createdAt: new Date('2024-05-10T15:30:00Z'),
          }
        ],

        // seed venues into show (and seed times into venues) -----------------------------------------------------------------//

        venue: [

          {
            name: 'RAC Arena, Perth',
            seatRows: 4,
            seatCols: 4,
            time: [
              { time: '2024-08-09T00:00:00Z' },
              { time: '2024-08-10T00:00:00Z' },
            ]
          },

          {
            name: 'Adelaide Entertainment Centre, Adelaide',
            seatRows: 5,
            seatCols: 5,
            time: [
              { time: '2024-09-01T00:00:00Z' },
              { time: '2024-09-02T00:00:00Z' },
            ]
          },

          {
            name: 'Marvel Stadium, Melbourne',
            seatRows: 6,
            seatCols: 6,
            time: [
              { time: '2024-11-05T00:00:00Z' },
              { time: '2024-11-06T00:00:00Z' },
            ]
          },
        ]
      },

      {
        name: 'Iron Maiden: Future Past World Tour',
        description:
          'The "Future Past World Tour" is an ongoing concert tour by English heavy metal band, Iron Maiden, in support of their seventeenth studio album "Senjutsu" and their 1996 album "Somewhere in Time". Iron Maiden is a British heavy metal band that has become one of the most influential and enduring acts in the history of rock music. The band is known for its known for their complex compositions, featuring galloping rhythms, dueling guitar solos, and operatic vocals, as well as their elaborate stage shows. Featuring live performance of hit track such as "Stratego", "The Writing on the Wall", and "Days of Future Past"',
        ticketBannerImg: 'banner-IM.jpg',
        ticketDesc: 'The Future Past World Tour has been called one of the most "spectacular stage productions" the band have ever delivered. The iconic British metal band have planned an unforgettable show, featuring live performances of hit Maiden songs that have never been played live before. ',
        image: 'IMimage.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=UEEm61impBY',
        price: 109.99,
        ticketQuant: 5,

        // seed thoughts into show -----------------------------------------------------------------//

        thoughts: [
          {
            thoughtText: "Just saw Iron Maiden at the RAC Arena and it was amazing!",
            thoughtAuthor: "Amiko",
            createdAt: new Date('2024-05-12T10:00:00Z'),
          },
          {
            thoughtText: "I've been to all of Iron Maiden's concerts and this is definitely the best I've seen so far.",
            thoughtAuthor: "David",
            createdAt: new Date('2024-05-10T15:30:00Z'),
          }
        ],

        // seed venues into show (and seed times into venues) -----------------------------------------------------------------//

        venue: [

          {
            name: 'RAC Arena, Perth',
            seatRows: 4,
            seatCols: 4,
            time: [
              { time: new Date('2024-08-09T00:00:00Z') },
              { time: new Date('2024-08-10T00:00:00Z') },
            ]
          },

          {
            name: 'Adelaide Entertainment Centre, Adelaide',
            seatRows: 5,
            seatCols: 5,
            time: [
              { time: new Date('2024-09-01T00:00:00Z') },
              { time: new Date('2024-09-02T00:00:00Z') },
            ]
          },

          {
            name: 'Rod Laver Arena, Melbourne',
            seatRows: 3,
            seatCols: 3,
            time: [
              { time: new Date('2024-11-05T00:00:00Z') },
              { time: new Date('2024-11-06T00:00:00Z') },
            ]
          },

          {
            name: 'Brisbane Entertainment Centre, Brisbane',
            seatRows: 2,
            seatCols: 2,
            time: [
              { time: new Date('2024-11-05T00:00:00Z') },
              { time: new Date('2024-11-06T00:00:00Z') },
            ]
          },

          {
            name: 'Qudos Bank Arena, Sydney',
            seatRows: 3,
            seatCols: 4,
            time: [
              { time: new Date('2024-11-05T00:00:00Z') },
              { time: new Date('2024-11-06T00:00:00Z') },
            ]
          },
        ]
      },

      {
        name: 'Taylor Swift: Eras World Tour',
        description:
          'The "Eras Tour" is the sixth concert tour by American singer-songwriter Taylor Swift, who is renowned for her narrative songwriting, catchy pop hooks, and elaborate stage productions. The show features live performances of hit tracks encompassing her entire career, from her country beginnings to her pop superstardom. The concert features live performance of tracks such as "We Are Never Ever Getting Back Together", "Bad Blood", and "Shake It Off".',
        ticketBannerImg: 'banner-TS.jpg',
        ticketDesc: 'Taylor Swift and her production team The Eras Tour is structured to highlight the different phases of her musical career, and featuring songs across all her studio albums. Each segment of the concert is dedicated to a specific era, with Swift performing songs that define that period of her career. The tour is a vibrant mix of nostalgia and innovation, offering fans a comprehensive experience of her artistic evolution."',
        image: 'TSimage.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=KudedLV0tP0',
        price: 107.99,
        ticketQuant: 5,

        // seed thoughts into show -----------------------------------------------------------------//

        thoughts: [
          {
            thoughtText: "If you only see Taylor Swift perform live once, I highly recommend this show, it's worth it!",
            thoughtAuthor: "Amiko",
            createdAt: new Date('2024-05-12T10:00:00Z'),
          },
          {
            thoughtText: "Taylor is a true performer. Her voice is even more powerful live than on her albums.",
            thoughtAuthor: "David",
            createdAt: new Date('2024-05-10T15:30:00Z'),
          }
        ],

        // seed venues into show (and seed times into venues) -----------------------------------------------------------------//

        venue: [
          {
            name: 'Accor Stadium, Sydney',
            seatRows: 2,
            seatCols: 6,
            time: [
              { time: new Date('2024-10-01T00:00:00Z') },
              { time: new Date('2024-11-02T00:00:00Z') },
            ]
          },
          {
            name: 'Melbourne Cricket Ground (MCG), Melbourne',
            seatRows: 2,
            seatCols: 6,
            time: [
              { time: new Date('2024-10-01T00:00:00Z') },
              { time: new Date('2024-11-02T00:00:00Z') },
            ]
          },
        ]
      },

      {
        name: 'Dua Lipa: Radical Optimism Tour',
        description:
          'The "Radical Optimism Tour" is a global concert tour by English/Albanian singer-songwriter Dua Lipa, in support of her third studio album, "Radical Optimism." It features the hit pop anthems retro flair and a modern twist. Dua Lipa is known for her powerful vocals, energetic performances, and catchy pop anthems with retro flair and a modern twist. The concert features live performance of tracks such as "Houdini", "Training Season", and "Illusion". ',
        ticketBannerImg: 'banner-DL-X.jpg',
        ticketDesc: 'The show is produced by creative studio Ceremony London, and Dua Lipa and her team aims to deliver a show influenced by 1970s-era psychedelia, disco, Britpop, and British rave. It mixes live instrumentation with electronic production.',
        image: 'DLimage.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=a9cyG_yfh1k',
        price: 104.99,
        ticketQuant: 5,
        // seed thoughts into show -----------------------------------------------------------------//

        thoughts: [
          {
            thoughtText: "I saw this show at the Adelaide Entertainment Centre and it was one-of-a-kind, plus scored some amazing seats!",
            thoughtAuthor: "Amiko",
            createdAt: new Date('2024-05-12T10:00:00Z'),
          },
          {
            thoughtText: "The Radical Optimism Tour was even better than the Future Nostalgia Tour.",
            thoughtAuthor: "David",
            createdAt: new Date('2024-05-10T15:30:00Z'),
          }
        ],

        // seed venues into show (and seed times into venues) -----------------------------------------------------------------//

        venue: [

          {
            name: 'RAC Arena, Perth',
            seatRows: 4,
            seatCols: 4,
            time: [
              { time: new Date('2024-11-09T00:00:00Z') },
              { time: new Date('2024-11-10T00:00:00Z') },
            ]
          },

          {
            name: 'Adelaide Entertainment Centre, Adelaide',
            seatRows: 5,
            seatCols: 5,
            time: [
              { time: new Date('2024-12-01T00:00:00Z') },
              { time: new Date('2024-09-02T00:00:00Z') },
            ]
          },

          {
            name: 'Rod Laver Arena, Melbourne',
            seatRows: 3,
            seatCols: 3,
            time: [
              { time: new Date('2024-05-05T00:00:00Z') },
              { time: new Date('2024-06-06T00:00:00Z') },
            ]
          },

          {
            name: 'Brisbane Entertainment Centre, Brisbane',
            seatRows: 2,
            seatCols: 2,
            time: [
              { time: new Date('2024-02-05T00:00:00Z') },
              { time: new Date('2024-03-06T00:00:00Z') },
            ]
          },

          {
            name: 'Qudos Bank Arena, Sydney',
            seatRows: 3,
            seatCols: 4,
            time: [
              { time: new Date('2024-11-05T00:00:00Z') },
              { time: new Date('2024-08-06T00:00:00Z') },
            ]
          },
        ]
      },

    ]);

    console.log('🎤 shows seeded');

    console.log('💭 thoughts seeded');

       // ----------------------------------------------- create users

       const xandromus = await User.create({
        firstName: 'Xandromus',
        lastName: 'X',
        email: 'xandro@aol.com',
        password: '12345',
        orders: [
          {
            products: [products[0]._id, products[0]._id, products[1]._id]
          }
        ],
        tickets: [
          // seed tickets for xandromus
          {
            purchaseDate: new Date(),
            showName: shows[0].name, 
            price: shows[0].price,
            venue: shows[0].venue[0].name, 
            time: shows[0].venue[0].time[0].time 
          },
          {
            purchaseDate: new Date(),
            showName: shows[1].name, 
            price: shows[1].price,
            venue: shows[1].venue[0].name, 
            time: shows[1].venue[0].time[0].time 
          }
          // Add more tickets....
        ]
      });

      console.log('🎫 tickets seeded');
  
      await User.create({
        firstName: 'Sal',
        lastName: 'W',
        email: 'sal@hotmail.com',
        password: 'password12345'
      });
  
      await User.create({
        firstName: 'Lernantino',
        lastName: 'V',
        email: 'lernantino@gmail.com',
        password: 'password12345'
      });
  
      await User.create({
        firstName: 'Amiko',
        lastName: 'Y',
        email: 'amiko2k20@aol.com',
        password: 'password12345'
      });
  
      await User.create({
        firstName: 'David',
        lastName: 'Thomas',
        email: 'dthomas@techfriends.dev',
        password: 'password08'
      });
  
      console.log('🔑 users seeded');

    // ---------------------------------------------------------- //

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});