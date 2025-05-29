import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Resources.css';

const Resources = () => {
  const [showPetals, setShowPetals] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const resources = [
    {
      title: "Fashion Trends 2025",
      description: "Discover the latest fashion trends and how to incorporate them into your daily outfits.",
      link: "https://www.whowhatwear.com/fashion/trends/spring-summer-2025-fashion-trends"
    },
    {
      title: "Seasonal Color Guide",
      description: "Learn which colors work best for each season to always look your best.",
      link: "https://theconceptwardrobe.com/colour-analysis-comprehensive-guides/complete-seasonal-guides"
    },
    {
      title: "Wardrobe Essentials",
      description: "The must-have items every wardrobe needs for versatile outfit combinations.",
      link: "https://www.vogue.com/article/vogue-wardrobe-essentials-guide"
    }
  ];

  // Sample outfits for calendar
  const outfits = {
    2: {
      image: "https://i.pinimg.com/736x/1e/6b/9b/1e6b9b38f0a6c5a6e1dba970930ef5f6.jpg",
      description: "Casual summer outfit with light colors",
      accessories: "Straw hat, sandals"
    },
    10: {
      image: "https://i.pinimg.com/736x/9c/55/61/9c556154a693482728e34c5f8add27b6.jpg",
      description: "Business casual for meetings",
      accessories: "Watch, leather bag"
    },
    15: {
      image: "https://i.pinimg.com/736x/55/9a/6e/559a6e6441e8f2e05b52a303074ad80c.jpg",
      description: "Evening dinner date outfit",
      accessories: "Statement necklace, clutch"
    }
  };

  // Complete body type information with outfit recommendations
  const bodyTypeInfo = {
    "Pear (F)": {
      description: "A pear-shaped body type, also known as a triangle shape, is characterized by having hips and thighs that are wider than the shoulders and bust.",
      image: "https://i.pinimg.com/736x/25/47/b8/2547b890bb4bc73d5bb40fb90894c158.jpg",
      tips: ["Wider Hips and Thighs", "Smaller Bust and Shoulders", "Slim Shoulders and Arms"],
     outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
             "https://i.pinimg.com/736x/1e/6b/9b/1e6b9b38f0a6c5a6e1dba970930ef5f6.jpg",
             "https://i.pinimg.com/736x/6a/40/0c/6a400cda0464d52e7a1af255d5d4039e.jpg",
             "https://i.pinimg.com/736x/a5/d7/7d/a5d77d531dd2881627744ecb7e2c6a58.jpg",
             "https://i.pinimg.com/736x/b2/f4/a5/b2f4a51a3df6ee836912d2a0182a8aba.jpg",
            "https://i.pinimg.com/736x/16/f4/3a/16f43abc3ad6cbd6222f6114f205510b.jpg",
            "https://i.pinimg.com/736x/da/cb/bf/dacbbfddded2d265805339895964fac3.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
            "https://i.pinimg.com/736x/9c/55/61/9c556154a693482728e34c5f8add27b6.jpg",
            "https://i.pinimg.com/736x/9a/82/f8/9a82f8b590699fc2920b879607d063f5.jpg",
            "https://i.pinimg.com/736x/6f/4e/35/6f4e3525b24e65dbfed3035fe0ea4cbd.jpg",
            "https://i.pinimg.com/736x/8f/07/a3/8f07a33f353940228822adf054b740a5.jpg",
            "https://i.pinimg.com/736x/7a/4a/20/7a4a206da3b7b8db05818a6ecb961517.jpg",
            "https://i.pinimg.com/736x/57/83/ee/5783ee7e566cd1bba5ecb236bac546fd.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
          "https://i.pinimg.com/736x/51/18/88/51188862d66042837649b54c9a3ba0b9.jpg",
          "https://i.pinimg.com/736x/68/b9/b6/68b9b68ad8840fa695976b872977dc5e.jpg",
          "https://i.pinimg.com/736x/9b/c7/41/9bc7411ca4ebb320c832e35617f3a05f.jpg",
          "https://i.pinimg.com/736x/4b/41/fd/4b41fdd5d281a1be9fdd5b9b56b1cc34.jpg",
          "https://i.pinimg.com/736x/d4/31/34/d43134c1a9baf48e4157f7d9dd02ef8d.jpg",
          "https://i.pinimg.com/736x/5a/7b/8d/5a7b8d7678c08e1f127ff5f0e394d54b.jpg"
        ],
        category: "Random"
      }
      ]
    },
    "Apple (F)": {
      description: "Apple shape: Broader shoulders and bust with slimmer hips.",
      image: "https://i.pinimg.com/736x/b3/90/49/b390491afd32d4e919d68e8a485e0934.jpg",
      tips: ["Draw attention to your legs", "Choose V-neck tops", "Wear empire waist dresses"],
      outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
          "https://i.pinimg.com/736x/ac/0a/db/ac0adbcdee9d31e57ac04431ecb81842.jpg",
          "https://i.pinimg.com/736x/89/1e/7a/891e7ab20f6af35ea63991d61fc9a237.jpg",
          "https://i.pinimg.com/736x/9b/00/74/9b00740c5ac14d483618ab6e9bf5b168.jpg",
          "https://i.pinimg.com/736x/8b/1d/68/8b1d68a4fc614ce3c6d69682f7237853.jpg",
          "https://i.pinimg.com/736x/52/eb/22/52eb2291c4f5f3a87f9b3f31cbdce7a8.jpg",
          "https://i.pinimg.com/736x/0c/92/99/0c9299606d8cceb5f40b3d5a6c0bdc3a.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://i.pinimg.com/736x/a2/4b/f7/a24bf727444e33e349363e88efb1b679.jpg",
          "https://i.pinimg.com/736x/89/fa/c8/89fac8f0c34eb89a571f4d2595a2d62f.jpg",
          "https://i.pinimg.com/736x/41/34/28/41342867a4a6691596fbbe7aa6e09b55.jpg",
          "https://i.pinimg.com/736x/1b/94/32/1b9432b92793c97510a2318eb0e4a4d1.jpg",
          "https://i.pinimg.com/736x/0d/6b/a6/0d6ba6154ec0bea8d621fbe21d14e3de.jpg",
          "https://i.pinimg.com/736x/b7/77/24/b777243854250c5beb2e92acbc55f397.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
          "https://i.pinimg.com/736x/38/bc/09/38bc09cf55b2479f4966504f7191c692.jpg",
          "https://i.pinimg.com/736x/d7/70/b8/d770b83a4fd719eefab9541d4bcc21b9.jpg",
          "https://i.pinimg.com/736x/0a/17/10/0a17107f4b25ad668e3251ff824e0315.jpg",
          "https://i.pinimg.com/736x/a8/cd/0f/a8cd0fae6cdfc1938d3093245f70548d.jpg",
          "https://i.pinimg.com/736x/8d/ed/be/8dedbeea5ac39023146367bd1f898e5d.jpg",
          "https://i.pinimg.com/736x/27/58/3c/27583cb0cb59912fa87696575814c40a.jpg"
        ],
        category: "Random"
      }
      ]
    },
    "Rectangle (F)": {
      description: "Rectangle shape: Balanced bust and hips with less defined waist.",
      image: "https://i.pinimg.com/736x/7d/e9/be/7de9befffca8bd2adb2bfc9ec636e04a.jpg",
      tips: ["Create curves with belts", "Try peplum tops", "Wear layered outfits"],
      outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
          "https://i.pinimg.com/736x/c4/a8/a9/c4a8a9e732ae05eff0c26119b47acf44.jpg",
          "https://i.pinimg.com/736x/13/62/be/1362be1252d6f24adc55173ca1cb9104.jpg",
          "https://i.pinimg.com/736x/bd/6a/13/bd6a135799a5ef693df7b64d2408c1a9.jpg",
          "https://i.pinimg.com/736x/d7/41/14/d7411456441447d3b2210b8482c46402.jpg",
          "https://i.pinimg.com/736x/ce/f7/3a/cef73afe16cd239e54e3095aa2be3c07.jpg",
          "https://i.pinimg.com/736x/5e/0f/52/5e0f524aae7ab3eeb48678688df57602.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://i.pinimg.com/736x/3c/75/b0/3c75b01a9eac65bd29dba2afeddbcd89.jpg",
          "https://i.pinimg.com/736x/62/98/62/6298627152c13f22f66a36bfe44ba199.jpg",
          "https://i.pinimg.com/736x/c4/84/84/c48484d4067c4577355cf980e5b7b2a5.jpg",
          "https://i.pinimg.com/736x/63/07/49/630749cbdbf5317cf420bc88eab7b8fb.jpg",
          "https://i.pinimg.com/736x/00/51/68/00516824d3697fd5ef91cf55e3685308.jpg",
          "https://i.pinimg.com/736x/7b/91/da/7b91daa469d92610d8a1b26b83b57b2d.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
          "https://i.pinimg.com/736x/7b/4b/2c/7b4b2c0d73bd3f0f571bc2b45c8504e8.jpg",
          "https://i.pinimg.com/736x/b0/36/2b/b0362b72d8c59a22c986bb18b2124a62.jpg",
          "https://i.pinimg.com/736x/3f/13/94/3f139439dac95ca96520e1ce13ae037d.jpg",
          "https://i.pinimg.com/736x/33/88/2a/33882a7fcf85a56ac9c5986beb3dc536.jpg",
          "https://i.pinimg.com/736x/62/4f/8f/624f8f0c3f35bef7cf82586489936257.jpg",
          "https://i.pinimg.com/736x/d5/68/58/d568588fc870f2de4a70b4eea79a1c60.jpg"
        ],
        category: "Random"
      }
      ]
    },
    "Hourglass (F)": {
      description: "Hourglass shape: Balanced bust and hips with a narrow waist.",
      image:  "https://i.pinimg.com/736x/a4/e5/88/a4e5882b7ac55a63ea9287b9182fa7b7.jpg",
      tips: ["Highlight your waist", "Choose fitted clothing", "Wrap dresses work great"],
      outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image:[ 
          "https://i.pinimg.com/736x/55/9a/6e/559a6e6441e8f2e05b52a303074ad80c.jpg",
          "https://i.pinimg.com/736x/2d/7a/68/2d7a683b1cecf304758b20a0ab9b0ea3.jpg",
          "https://i.pinimg.com/736x/54/48/f5/5448f5c11500ebe9c27f133375b2941d.jpg",
          "https://i.pinimg.com/736x/27/1b/a3/271ba3829ae6bada922270d029ff3bfe.jpg",
          "https://i.pinimg.com/736x/94/59/db/9459db6a835d203f16d4876b21818e7d.jpg",
          "https://i.pinimg.com/736x/bc/b7/8d/bcb78dce36941e458fa82be7f5e9725a.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://www.styledbysally.com.au/wp-content/uploads/2022/03/image8.jpg",
          "https://i.pinimg.com/736x/1e/c5/87/1ec587b81c83bb2d26e8e36f130f5806.jpg",
          "https://i.pinimg.com/736x/00/45/9a/00459a79e59357eab198a2b865bd6e37.jpg",
          "https://i.pinimg.com/736x/da/ab/53/daab53cff3eedac63b857713a391d947.jpg",
          "https://i.pinimg.com/736x/7e/d9/17/7ed917ae0b1c9084d59edccd47d08bcf.jpg",
          "https://i.pinimg.com/736x/0d/ef/02/0def027a4af4810aff972017b8ca5171.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
           "https://i.pinimg.com/736x/38/37/7e/38377ea68a69a1e099590e93dd9565e3.jpg",
           "https://i.pinimg.com/736x/75/65/fe/7565fe9edbe30646f85c7c3e9b42e78b.jpg",
           "https://i.pinimg.com/736x/e2/48/f8/e248f859c11caa1fe96dcd3ae07b3309.jpg",
           "https://i.pinimg.com/736x/f3/8e/6c/f38e6c63d2b8a32ea5199afc29329250.jpg",
           "https://i.pinimg.com/736x/d1/e2/06/d1e20644ebebb416e70c4f5efcd3da0c.jpg",
           "https://i.pinimg.com/736x/b5/2c/37/b52c376d155b17dad3380225859fa886.jpg"
        ],
        category: "random"
      }
      ]
    },
    "Triangle (F)": {
      description: "Triangle shape: Narrow shoulders and wider hips.",
      image: "https://i.pinimg.com/736x/7c/8c/f2/7c8cf2851e501102fcad4cf03e4f3c5a.jpg",
      tips: ["Build upper body", "Wear structured jackets", "Choose darker bottoms"],
       outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
          "https://i.pinimg.com/736x/56/76/5d/56765d7b42511266dda26094e8f0b237.jpg",
          "https://i.pinimg.com/736x/91/bb/aa/91bbaa36fc152a0bada15395dd1958ce.jpg",
          "https://i.pinimg.com/736x/55/50/b2/5550b273e69853e0fe64238c55a94907.jpg",
          "https://i.pinimg.com/736x/2c/ee/83/2cee830682db35d253b0fbc47b2e7a6c.jpg",
          "https://i.pinimg.com/736x/18/54/5e/18545e118c7d768c037c88fad8033702.jpg",
          "https://i.pinimg.com/736x/00/3f/0d/003f0d8964e3bacbc5c61ac35228bf92.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://i.pinimg.com/736x/51/8f/7e/518f7e3c38855203f7146ee55c3ae6e1.jpg",
          "https://i.pinimg.com/736x/6c/70/f6/6c70f6f13c57855af3901860a32f2e2b.jpg",
          "https://i.pinimg.com/736x/17/48/ac/1748ac3d467dd053af4957a5f94a4137.jpg",
          "https://i.pinimg.com/736x/b6/ef/f8/b6eff88a4fda0cf7d07da92de1aecd1e.jpg",
          "https://i.pinimg.com/736x/73/00/ff/7300ff9e0feb391e204d80be5ef4f2f8.jpg",
          "https://i.pinimg.com/736x/73/08/61/73086198edc434c85e7ed6d537107ac4.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
          "https://i.pinimg.com/736x/f0/47/c1/f047c12fe8fa278f4662d7f1d2378e07.jpg",
          "https://i.pinimg.com/736x/b4/60/78/b4607813d151f260184dd08fbfd12636.jpg",
          "https://i.pinimg.com/736x/c2/ed/8b/c2ed8bec88a9cf2f86ff8a50cfcc499d.jpg",
          "https://i.pinimg.com/736x/55/dc/21/55dc21f620453c1564e45691a9066720.jpg",
          "https://i.pinimg.com/736x/b2/81/35/b281356722a2ee973970f66f8040cb7b.jpg",
          "https://i.pinimg.com/736x/42/1c/04/421c04101f69b2530263fa50e02e5df2.jpg"
        ],
        category: "Random"
      }
      ]
    },
    "Round (F)": {
      description: "Inverted Triangle shape: Broad shoulders and narrow hips.",
      image: "https://i.pinimg.com/736x/9c/38/1a/9c381a2776acda84e9045bf7b10880c7.jpg",
      tips: ["Balance with straight leg pants", "Avoid shoulder pads", "Wear lighter colors"],
       outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
          "https://i.pinimg.com/736x/27/67/ce/2767ce6be1b91f5633230fda9669ded6.jpg",
          "https://i.pinimg.com/736x/de/82/30/de8230be33be794d9aa7aefb00fa26fc.jpg",
          "https://i.pinimg.com/736x/87/1a/9b/871a9b9f7356f0b82a3e285a2e988d0b.jpg",
          "https://i.pinimg.com/736x/63/94/ed/6394ed1c49c7ef2dca8a98e8c7244efc.jpg",
          "https://i.pinimg.com/736x/79/2a/b9/792ab973cf41bcc2154ae0d32306e71e.jpg",
          "https://i.pinimg.com/736x/b7/74/5f/b7745f1f3c747b20f1d9ef6e4ba317ae.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://i.pinimg.com/736x/b0/9e/ce/b09ece168ce6e634d2166c64a065fa37.jpg",
          "https://i.pinimg.com/736x/70/b8/13/70b8132b34047dfd309308c0e90cea66.jpg",
          "https://i.pinimg.com/736x/11/e9/6c/11e96cb7030dbbf42bda1451dc822bbd.jpg",
          "https://i.pinimg.com/736x/92/ef/4d/92ef4dfe09377a9460b12e86c26254a0.jpg",
          "https://i.pinimg.com/736x/f1/f0/08/f1f0088faeddc330bb4587d1c2506254.jpg",
          "https://i.pinimg.com/736x/3e/fc/b2/3efcb27f09d309f21dc6489a1de05934.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image: [
          "https://i.pinimg.com/736x/3b/2a/49/3b2a49546b0c1593eb5bd9a267f7a58f.jpg",
          "https://i.pinimg.com/736x/a6/e8/73/a6e8732716554925cf45b01e6d545629.jpg",
          "https://i.pinimg.com/736x/13/06/9a/13069ab1c5306d685239ff5de3fbd311.jpg",
          "https://i.pinimg.com/736x/ea/94/ed/ea94eda3f93794c824a26a57b81af92b.jpg",
          "https://i.pinimg.com/736x/cb/53/27/cb53279249c4d7d26ee3db996cab2f10.jpg",
          "https://i.pinimg.com/736x/a7/08/13/a7081382d395c857749e16d6a088efba.jpg"
        ],
        category: "Random"
      }
      ]
    },
    "Oval (M)": {
      description: "Oval shape: Rounder midsection with slimmer legs and arms.",
      image: "https://dressedformyday.com/wp-content/uploads/2018/06/the-oval-or-O-body-shape-683x1024.png",
      tips: ["Choose vertical stripes", "Wear structured jackets", "Avoid tight clothing"],
       outfits: [
      {
        type: "Fitted Dress",
        description: "Accentuates your curves",
        image: [
          "https://i.pinimg.com/736x/30/73/11/307311d469da7781a04bd780fbf8cb14.jpg",
          "https://i.pinimg.com/736x/01/5e/08/015e08d144d554c68ff1977d15a82800.jpg",
          "https://i.pinimg.com/736x/cf/22/aa/cf22aa48402b9ae7f45f0a4b97a96381.jpg",
          "https://i.pinimg.com/736x/82/70/1c/82701cae572c1a24438391aec1c75f76.jpg",
          "https://i.pinimg.com/736x/a7/bd/47/a7bd4706097a2ac174df7d1aaa07abd4.jpg",
          "https://i.pinimg.com/736x/52/f2/37/52f23707322e9eb453759ecbe65a1e0a.jpg"
        ],
        category: "western"
      },
      {
        type: "Jeans and T-shirt",
        description: "Casual everyday look",
        image: [
          "https://i.pinimg.com/736x/d6/7e/f0/d67ef0fd2a9b174ad4cf9c06769e4921.jpg",
          "https://i.pinimg.com/736x/b2/fe/6d/b2fe6dd3ef4c3316f5bf1ccb677171f0.jpg",
          "https://i.pinimg.com/736x/fe/f2/dd/fef2dd60013092042a68eb174c803039.jpg",
          "https://i.pinimg.com/736x/52/2e/d8/522ed81db6610c9b5eddb1154903d836.jpg",
          "https://i.pinimg.com/736x/b3/bc/0c/b3bc0c867254eda84fff5ad64bac4c42.jpg",
          "https://i.pinimg.com/736x/2b/6a/55/2b6a55c6774525c43eaeb0602abe7a77.jpg"
        ],
        category: "casual"
      },
      {
        type: "Business Suit",
        description: "Professional formal wear",
        image:[
          "https://i.pinimg.com/736x/e5/c4/2f/e5c42f151c8afc08c0f9bd48e9b50860.jpg",
          "https://i.pinimg.com/736x/4e/92/a5/4e92a50070e6832ac9ed702c2685f9c6.jpg",
          "https://i.pinimg.com/736x/57/97/76/579776b01912d412fb31160cfadb2cc5.jpg",
          "https://i.pinimg.com/736x/11/e3/79/11e3793c88e6bc03ec7940e1a6b3067f.jpg",
          "https://i.pinimg.com/736x/b4/58/6a/b4586acac71fa54317b2e88d1d8eedd6.jpg",
          "https://i.pinimg.com/736x/bb/a5/bf/bba5bff53259858cb6de71d6e48ec674.jpg"
        ],
        category: "Random"
      }
      ]
    }
  };

  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const weeks = [
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, '', '', '', '', '']
  ];

  const handlePetalClick = (bodyType) => {
    setSelectedBodyType(bodyType);
  };

  const closeModel = () => {
    setSelectedBodyType(null);
  };

  const closePetals = () => {
    setShowPetals(false);
    setSelectedBodyType(null);
  };

  const handleDateClick = (day) => {
    if (day && outfits[day]) {
      setSelectedDate(day);
    }
  };

  const closeOutfitModal = () => {
    setSelectedDate(null);
  };
  
  const [showModal, setShowModal] = useState(false);
const [step, setStep] = useState(0);
const [answers, setAnswers] = useState([]);
const [showResult, setShowResult] = useState(false);

const questions = [
  {
    question: "What's your go-to outfit when you want to feel confident?",
    options: [
      "High-waist jeans and a tucked-in blouse",
      "A fit-and-flare dress",
      "A bodycon dress or jumpsuit",
      "Flowy tunic with leggings",
    ],
  },
  {
    question: "Which accessory do you reach for first?",
    options: [
      "Statement belt",
      "Long pendant necklace",
      "Oversized earrings",
      "Chunky scarf",
    ],
  },
  {
    question: "What's your biggest style challenge?",
    options: [
      "Balancing wider hips",
      "Defining the waist",
      "Dressing a fuller bust or tummy",
      "Adding curves to a straighter figure",
    ],
  },
  {
    question: "Pick the silhouette that attracts you most:",
    options: [
      "A-line skirts",
      "Wrap dresses",
      "Straight cut trousers",
      "Empire waist tops",
    ],
  },
  {
    question: "Which fashion advice do you relate to most?",
    options: [
      "Highlight the waist and avoid heavy bottoms",
      "Emphasize upper body and wear darker lower tones",
      "Add volume to shoulders and bust",
      "Keep proportions balanced and clean",
    ],
  },
  {
    question: "What type of jeans do you prefer?",
    options: [
      "Bootcut or flared",
      "Straight leg",
      "High-rise skinny",
      "Relaxed boyfriend fit",
    ],
  },
];

const keywordMap = {
  Pear: ["High-waist jeans", "Statement belt", "Balancing wider hips", "A-line skirts", "Highlight the waist", "Bootcut"],
  Apple: ["Flowy tunic", "Chunky scarf", "Dressing a fuller bust", "Empire waist", "Emphasize upper body", "Relaxed"],
  Rectangle: ["Bodycon", "Oversized earrings", "Adding curves", "Straight cut", "Add volume", "Straight leg"],
  Hourglass: ["Fit-and-flare", "Long pendant", "Defining the waist", "Wrap dresses", "Keep proportions", "High-rise"],
};

const handleAnswer = (option) => {
  setAnswers([...answers, option]);
  if (step < questions.length - 1) {
    setStep(step + 1);
  } else {
    setShowResult(true);
  }
};

const handleRestart = () => {
  setStep(0);
  setAnswers([]);
  setShowResult(false);
};

const getResult = () => {
  const score = {};
  Object.keys(keywordMap).forEach((type) => {
    score[type] = answers.filter((answer) =>
      keywordMap[type].some((keyword) => answer.includes(keyword))
    ).length;
  });
  const result = Object.entries(score).reduce(
    (max, current) => (current[1] > max[1] ? current : max),
    ["", 0]
  )[0];
  return result;
};

const getResultDescription = (type) => {
  const descriptions = {
    Pear: "You have a beautiful pear-shaped body with fuller hips and a defined waist.",
    Apple: "You have a strong apple-shaped figure with slimmer legs and fuller midsection.",
    Rectangle: "You have an athletic rectangle shape, sleek and modern.",
    Hourglass: "You have a classic hourglass figure with balanced bust and hips.",
  };
  return descriptions[type] || "You have a unique and charming body shape!";
};


  return (
    <div className="resources-container">
      {/* Left Side Content */}
      <div className="left-content-container">
        {/* Confidence Section Below OOTD */}
        <div className="calendar-container">
          <div className="calendar-card">
            {/* Falling Stars */}
           

            <h3 className="section-title">✨ Date Outfit Here U Go!</h3>
            
            <div className="calendar-header">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-header">
                  {day}
                </div>
              ))}
            </div>

            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="calendar-week">
                {week.map((day, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className={`calendar-day ${day === '' ? 'empty-day' : ''} ${outfits[day] ? 'has-outfit' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day || ''}
                    {outfits[day] && <span className="outfit-indicator">👗</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>


          {/* Outfit Modal */}
          {selectedDate && (
            <div className="outfit-modal-overlay" onClick={closeOutfitModal}>
              <div className="outfit-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={closeOutfitModal}>×</button>
                <h2>Outfit of the Day - {selectedDate}</h2>
                <div className="outfit-image" style={{ backgroundImage: `url(${outfits[selectedDate].image})` }}></div>
                <div className="outfit-details">
                  <p>{outfits[selectedDate].description}</p>
                  <p><strong>Accessories:</strong> {outfits[selectedDate].accessories}</p>
                </div>
              </div>
            </div>
          )}      
        </div>

        <div className="confidence-card">
          <div className="confidence-section">
            <h3 className="section-title">✨ WE Wear Confidence On Sleeves</h3>
            <p className="confidence-text">
              Confidence is not about fitting in, it's about standing out — embracing every curve, edge, and line that makes you <i>you</i>. Your body is not a problem to fix, but a masterpiece to celebrate.
            </p>
            <button className="confidence-button" onClick={() => setShowPetals(true)}>We've Got U</button>
          </div>
        </div>
        <div className="hear-us-out-section">
  <h3 className="section-title">✨ Hear Us Out</h3>
  
  <div className="fashion-quotes-container">
    {/* Quote 1 */}
    <div className="fashion-quote animated-quote">
      <div className="quote-text">
        "Fashion is the armor to survive the reality of everyday life."
      </div>
      <div className="quote-author">— Bill Cunningham</div>
      <div className="sparkle-effect">✨</div>
    </div>

    {/* Quote 2 */}
    <div className="fashion-quote animated-quote delay-1">
      <div className="quote-text">
        "Style is a way to say who you are without speaking."
      </div>
      <div className="quote-author">— Rachel Zoe</div>
      <div className="sparkle-effect">🌟</div>
    </div>

    {/* Quote 3 */}
    <div className="fashion-quote animated-quote delay-2">
      <div className="quote-text">
        "Confidence is the best outfit. Rock it and own it!"
      </div>
      <div className="quote-author">— Unknown</div>
      <div className="sparkle-effect">💫</div>
    </div>
  </div>
</div>
      </div>

      {/* Right Content */}
      <div className="right-content-container">
       <div className="overlapping-container">
  {/* Video Background */}
  <video 
    autoPlay
    loop
    muted
    playsInline
    className="video-background"
  >
    <source 
      src="https://diorama.dam-broadcast.com/pm_11872_1070_1070419-7pfuotlpgh.webm" 
      type="video/webm" 
    />
    {/* Fallback image if video doesn't load */}
    <img src="/fallback-bg.jpg" alt="Fashion background" />
  </video>
  
  {/* Gradient Overlay */}
  <div className="video-overlay1"></div>
  
  {/* Your Existing Content */}
  <h1 className="ootd-handwriting1">OOTD</h1>
  <p className="divyluck-subtitle">Outfit Of The Day With DivyLuck</p>
  <img className="right-overlap-image" src="/res.png" alt="Fashion illustration" />
</div>
        <div className="resource-cards-container">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link}>Explore →</a>
            </div>
            
            ))}
        </div>
        <div className="style-quiz-section">
  <div className="quiz-container">
    <div className="quiz-content">
      <h2>Discover Your Signature Style</h2>
      <p>
        Take our 2-minute quiz to uncover your fashion personality 
        and get personalized outfit recommendations.
      </p>
      <button className="quiz-button" onClick={() => setShowModal(true)}>
  Start Quiz <i className="fas fa-gem"></i>
</button>
{showModal && (
  <div className="quiz-modal">
    <div className="quiz-content">
      <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>

      {!showResult ? (
        <>
          <h3>Question {step + 1} of {questions.length}</h3>
          <h2>{questions[step].question}</h2>
          <div className="options-grid">
            {questions[step].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} className="option-button">
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Your Body Type: {getResult()}</h2>
          <p>{getResultDescription(getResult())}</p>
          <ul>
            {answers.map((a, i) => (
              <li key={i}><strong>Q{i + 1}:</strong> {a}</li>
            ))}
          </ul>
          <button onClick={handleRestart} className="restart-button">Take Again ⟳</button>
        </>
      )}
    </div>
  </div>
)}

    </div>
    <div className="quiz-video-container">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="quiz-video"
      >
        <source 
          src="https://diorama.dam-broadcast.com/pm_11872_1041_1041409-quw23gqly4.webm" 
          type="video/webm" 
        />
        {/* Fallback image if video doesn't load */}
        <img 
          src="/style-quiz-fallback.jpg" 
          alt="Style personality quiz" 
        />
      </video>
    </div>
  </div>
</div>

 </div>  
      {/* Petal Overlay */}
      {showPetals && (
        <div className="petal-overlay">
          <button className="close-button" onClick={closePetals}>X</button>
          <div className="petal-content">
            <h2>Explore Your Beautiful Body Type</h2>
            <div className="petal-circle">
              {Object.keys(bodyTypeInfo).map((bodyType) => (
                <div 
                  key={bodyType} 
                  className="petal" 
                  onClick={() => handlePetalClick(bodyType)}
                >
                  {bodyType}
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Body Type Model with Outfits */}
          {selectedBodyType && (
            <div className="body-type-model" style={{ zIndex: 10 }}>
              <div className="model-content">
                <button className="close-model-button" onClick={closeModel}>X</button>
                <img 
                  src={bodyTypeInfo[selectedBodyType].image} 
                  alt={selectedBodyType} 
                  className={`body-type-image body-type-image-${selectedBodyType.toLowerCase().replace(/\s/g, '-')}`}
                />

                <h2 className="petal-title">
                  <span className="petal1">{selectedBodyType}</span>
                </h2>
                
                <p>{bodyTypeInfo[selectedBodyType].description}</p>
                
                <div className="style-tips">
                  <h5>Key Characteristics:</h5>
                  <div className="tips-container">
                    {bodyTypeInfo[selectedBodyType].tips.map((tip, index) => (
                      <div key={index} className="tip-box">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outfit Recommendations Section */}
                <div className="outfit-recommendations">
  <h5 className="recommendation-title">Recommended Outfits</h5>
  
  <div className="outfit-category">
  <h6 className="category-title">Western Outfits</h6>
  <div className="outfits-grid">
    {bodyTypeInfo[selectedBodyType].outfits
      .filter(outfit => outfit.category.toLowerCase() === 'western')
      .slice(0, 5)
      .flatMap((outfit, index) => {
        // If outfit has multiple images, create a card for each
        if (Array.isArray(outfit.image)) {
          return outfit.image.map((img, imgIndex) => (
            <div key={`western-${index}-${imgIndex}`} className="outfit-card">
              <div className="card-image-container">
                <img
                  src={img}
                  alt={`${outfit.type} ${imgIndex + 1}`}
                  className="outfit-img"
                />
              </div>
              <div className="card-info">
                <h4>{outfit.type}</h4>
                <p>{outfit.description}</p>
              </div>
            </div>
          ));
        }
        // Single image outfit
        return (
          <div key={`western-${index}`} className="outfit-card">
            <div className="card-image-container">
              <img
                src={outfit.image}
                alt={outfit.type}
                className="outfit-img"
              />
            </div>
            <div className="card-info">
              <h4>{outfit.type}</h4>
              <p>{outfit.description}</p>
            </div>
          </div>
        );
      })}
  </div>
</div>
</div>


  {/* Casual Outfits Category */}
  <div className="outfit-category">
  <h6 className="category-title">Casual Outfits</h6>
  <div className="outfits-grid">
    {bodyTypeInfo[selectedBodyType].outfits
      .filter(outfit => outfit.category.toLowerCase() === 'casual')
      .slice(0, 5)
      .flatMap((outfit, index) => {
        // If outfit has multiple images, create a card for each
        if (Array.isArray(outfit.image)) {
          return outfit.image.map((img, imgIndex) => (
            <div key={`casual-${index}-${imgIndex}`} className="outfit-card">
              <div className="card-image-container">
                <img
                  src={img}
                  alt={`${outfit.type} ${imgIndex + 1}`}
                  className="outfit-img"
                />
              </div>
              <div className="card-info">
                <h4>{outfit.type}</h4>
                <p>{outfit.description}</p>
              </div>
            </div>
          ));
        }
        // Single image outfit
        return (
          <div key={`casual-${index}`} className="outfit-card">
            <div className="card-image-container">
              <img
                src={outfit.image}
                alt={outfit.type}
                className="outfit-img"
              />
            </div>
            <div className="card-info">
              <h4>{outfit.type}</h4>
              <p>{outfit.description}</p>
            </div>
          </div>
        );
      })}
  </div>
</div>
</div>

  {/* Random Outfits Category */}
  <div className="outfit-category">
  <h6 className="category-title">Random Suits</h6>
  <div className="outfits-grid">
    {bodyTypeInfo[selectedBodyType].outfits
      .filter(outfit => outfit.category.toLowerCase() === 'random')
      .slice(0, 5)
      .flatMap((outfit, index) => {
        // If outfit has multiple images, create a card for each
        if (Array.isArray(outfit.image)) {
          return outfit.image.map((img, imgIndex) => (
            <div key={`random-${index}-${imgIndex}`} className="outfit-card">
              <div className="card-image-container">
                <img
                  src={img}
                  alt={`${outfit.type} ${imgIndex + 1}`}
                  className="outfit-img"
                />
              </div>
              <div className="card-info">
                <h4>{outfit.type}</h4>
                <p>{outfit.description}</p>
              </div>
            </div>
          ));
        }
        // Single image outfit
        return (
          <div key={`random-${index}`} className="outfit-card">
            <div className="card-image-container">
              <img
                src={outfit.image}
                alt={outfit.type}
                className="outfit-img"
              />
            </div>
            <div className="card-info">
              <h4>{outfit.type}</h4>
              <p>{outfit.description}</p>
            </div>
          </div>
        );
      })}
  </div>
</div>
</div>
              
           
          )}
        </div>
      )}
    </div>
  );
};

export default Resources;