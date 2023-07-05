const TypographyTest = () => {
  const pairings = [
   ['jost', 'ovo'], 
   ['jost', 'montserrat'], 
   ['jost', 'jost'],
   ['jost', 'workSans'], 
   ['ovo', 'workSans'],
   ['montserrat', 'libreBaskerville'],
   ['ch-b', 'ch-r']
  ]

  return <main>
    { pairings.map(([title, body]) => (
      <section>
        <h1 className={title}>Big title {title} 1234567890</h1>
        <p className={body}>
         {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
        <h2 className={title}>Big title {title}  1234567890</h2>
        <p className={body}>
          {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
        <h3 className={title}>Med title {title}  1234567890</h3>
        <p className={body}>
          {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
        <h4 className={title}>Med title {title}  1234567890</h4>
        <p className={body}>
          {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
        <h5 className={title}>small title {title} 1234567890</h5>
        <p className={body}>
          {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
        <h6 className={title}>small title {title} 1234567890</h6>
        <p className={body}>
          {body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque aliquam mollitia tenetur dicta. Dolor voluptates veniam, voluptas laudantium quidem facere unde quos! Perspiciatis animi consequatur dolorem enim saepe expedita.
        </p>
      </section>
    ))}
  </main>
}

export default TypographyTest

/*

@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Jost:ital,wght@0,200;0,300;0,400;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0, 200;0,500;1,500&family=Ovo&family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;1,200;1,300;1,400;1,500;1,700&display=swap');

@font-face {
  font-family: 'CooperHewitt-Book';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Book'), url('/fonts/cooper-hewitt/CooperHewitt-Book.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Thin';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Thin'), url('/fonts/cooper-hewitt/CooperHewitt-Thin.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-ThinItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-ThinItalic'), url('/fonts/cooper-hewitt/CooperHewitt-ThinItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Light';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Light'), url('/fonts/cooper-hewitt/CooperHewitt-Light.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-LightItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-LightItalic'), url('/fonts/cooper-hewitt/CooperHewitt-LightItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-BookItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-BookItalic'), url('/fonts/cooper-hewitt/CooperHewitt-BookItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Medium';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Medium'), url('/fonts/cooper-hewitt/CooperHewitt-Medium.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-MediumItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-MediumItalic'), url('/fonts/cooper-hewitt/CooperHewitt-MediumItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Semibold';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Semibold'), url('/fonts/cooper-hewitt/CooperHewitt-Semibold.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-SemiboldItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-SemiboldItalic'), url('/fonts/cooper-hewitt/CooperHewitt-SemiboldItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Bold';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Bold'), url('/fonts/cooper-hewitt/CooperHewitt-Bold.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-BoldItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-BoldItalic'), url('/fonts/cooper-hewitt/CooperHewitt-BoldItalic.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-Heavy';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-Heavy'), url('/fonts/cooper-hewitt/CooperHewitt-Heavy.woff') format('woff');
  }
  

  @font-face {
  font-family: 'CooperHewitt-HeavyItalic';
  font-style: normal;
  font-weight: normal;
  src: local('CooperHewitt-HeavyItalic'), url('/fonts/cooper-hewitt/CooperHewitt-HeavyItalic.woff') format('woff');
  }


  .jost {
  font-family: 'Jost', sans-serif
}

h1.jost, h2.jost, h3.jost {
  text-transform: uppercase;
  letter-spacing: .3rem;
  font-weight: 300;
}

  */
