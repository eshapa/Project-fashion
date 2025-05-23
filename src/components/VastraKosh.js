import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './Vas.css';

const AestheticCards = () => {
  const navigate = useNavigate();

  const cardsData = [
    { id: 1, title: "Elegant Silk", media: "/assests/vedio.mp4", isVideo: true, poster: "/assests/vedio.jpg" },
    { id: 2, title: "Cotton Comfort", media: "/assests/stich.mp4", isVideo: true, poster: "/assests/stich.jpg" },
    { id: 3, title: "Stich Fashion", media: "/assests/fab2.mp4", isVideo: true, poster: "/assests/fab2.jpg" },
    { id: 4, title: "Premium Fabric", media: "/assests/ved.mp4", isVideo: true, poster: "/assests/ved.jpg" }
  ];

  const handleExploreClick = () => {
    navigate('/explore-shops');
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Featured Collection</h2>
      <Row className="justify-content-end g-4">
        {cardsData.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="aesthetic-card border-0">
              <div className="video-container">
                <video 
                  className="card-media"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={card.poster}
                >
                  <source src={card.media} type="video/mp4" />
                </video>
              </div>
            </Card>
          </Col>
        ))}
        <div className="marquee-container">
          <p className="marquee-text">
            - The House Of Dreams Divyluck - The House Of Dreams Divyluck - The House Of Dreams Divyluck -
          </p>
        </div>
      </Row>
      
      <section className="quote-section text-center py-5 px-3">
        <p className="quote-text">
          Appreciation of exquisitely made attire. Here you’ll feel special,
          and receive a uniquely personal tailoring experience.
        </p>
        <p className="quote-signature">Divyluck</p>
      </section>
      
      <Row className="my-5 g-4">
        <Col xs={12} md={6}>
          <Row className="g-4">
            <Col xs={12}>
              <Card className="border-0">
                <video 
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assests/car3.jpg"
                >
                  <source src="/assests/car3.mp4" type="video/mp4" />
                </video>
              </Card>
            </Col>
            <Col xs={12}>
              <Card className="border-0">
                <video 
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assests/car4.jpg"
                >
                  <source src="/assests/car4.mp4" type="video/mp4" />
                </video>
              </Card>
            </Col>

            <Col xs={12}>
              <div className="arched-card1">
                <div className="vas-logo">DivyLuck</div>
                <h2 className="vas-title">Vastrakosh</h2>
                <p className="vas-description">
                  "At Vastrakosh, we proudly showcase the work of passionate and hardworking shopkeepers who bring traditional craftsmanship and modern elegance together. Each vendor we collaborate with is handpicked for their dedication, creativity, and unwavering commitment to quality. From intricate handwoven fabrics to contemporary fashion pieces, our shopkeepers are the heart of this collection — celebrating culture, skill, and the spirit of small businesses."
                </p>
                <p className="vas-description2">
                  "At Vastrakosh, we proudly showcase the work of passionate and hardworking shopkeepers who bring traditional craftsmanship and modern elegance together. Each vendor we collaborate with is handpicked for their dedication, creativity, and unwavering commitment to quality. From intricate handwoven fabrics to contemporary fashion pieces, our shopkeepers are the heart of this collection  --- and spirit of businesses"
                </p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={6}>
          <Card className="border-0 minimal-video-card">
            <video
              style={{ width: '100%', height: '800px', objectFit: 'cover' }}
              autoPlay
              loop
              muted
              playsInline
              poster="/assests/car2.jpg"
            >
              <source src="/assests/car2.mp4" type="video/mp4" />
            </video>
            <button className="explore-button" onClick={handleExploreClick}>
              Explore Now
            </button>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 position-relative video-card">
        <video 
          className="w-100"
          style={{ height: '800px', objectFit: 'cover' }}
          autoPlay
          loop
          muted
          playsInline
          poster="/assests/car5.jpg"
        >
          <source src="/assests/car5.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay">
          <h1 className="video-heading">Crafted with Passion, Worn with Pride </h1>
          <p className="vas-description3">
            "At Vastrakosh, we proudly showcase the work of passionate and hardworking shopkeepers who bring traditional craftsmanship and modern elegance together. Each vendor we collaborate with is handpicked for their dedication, creativity, and unwavering commitment to quality. From intricate handwoven fabrics to contemporary fashion pieces, our shopkeepers are the heart of this collection — celebrating culture, skill, and the spirit of small businesses."
          </p>
          <p className="vas-description3">
            "At Vastrakosh, we proudly showcase the work of passionate and hardworking shopkeepers who bring traditional craftsmanship and modern elegance together. Each vendor we collaborate with is handpicked for their dedication, creativity, and unwavering commitment to quality. From intricate handwoven fabrics to contemporary fashion pieces, our shopkeepers are the heart of this collection  --- and spirit of businesses"
          </p>
          <button className="explore-btn" onClick={handleExploreClick}>
            Explore Shops →
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default AestheticCards;