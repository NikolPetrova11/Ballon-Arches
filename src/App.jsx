import { useState } from 'react';
import { motion } from 'framer-motion';


const services = [
  {
    title: 'Birthday Decorations',
    title1: 'Украси за рожден ден',
    description: 'Стилни празненства с персонализирани балонени дизайни.',
    image: 'birthday.png',
  },
  {
    title: 'Baby Shower',
    title1: 'Бебешко парти',
    description: 'Нежни пастелни декорации, създадени за най-специалните нови моменти.',
    image: 'baby-shower.png',
  },
  {
    title: 'Gender Reveal',
    title1: 'Gender Reveal',
    description: 'Елегантни декорации, които превръщат разкриването на пола в незабравим момент.',
    image: 'gender-reveal.jpg',
  },
  {
    title: 'Wedding Decor', 
    title1: 'Сватбени украси',
    description: 'Романтични арки и изискани флорални детайли за вашия специален ден.',
    image: 'wedding.png',
  },
  {
    title: 'Corporate Events',
    title1: 'Корпоративни събития',
    description: 'Стилни решения и професионална визия за впечатляващи бранд събития.',
    image: 'corporate.png',
  },
  {
    title: 'Pogachas & christenings',
    title1: 'Погачи и кръщенета',
    description: 'Уникални балонени арки в персонализирани цветове и форми.',
    image: 'pogacha.png',
  },
  {
    title: 'Bachelor & Bachelorette Parties',
    title1: 'Момински и ергенски партита',
    description: 'Ефектни декорации, създадени за незабравими празнични моменти.',
    image: 'bride.png',
  },
  {
    title: 'Graduation Parties',
    title1: 'Парти за завършване',
    description: 'Елегантни декорации, създадени за този важен момент във вашия живот.',
    image: 'grad.png',
  },
  {
    title: 'Custom Decorations',
    title1: 'Индивидуални украси',
    description: 'Персонализирани детайли, които превръщат всяко събитие в специално преживяване.',
    image: 'custum.png',
  },
];

const pricing = [
  {
    name: 'Basic Decor',
    price: '100€',
    features: ['1 пано', 'Персонализиран надпис', 'Странична балонена декорация по избор'],
    button: 'Запази',
    popular: true,
  },
  {
    name: 'Premium Decor',
    price: '150€',
    features: ['2 пана', 'Персонализиран надпис', 'Стойка за торта', 'Допълнителни балони и елементи по избор'],
    button: 'Запази',
    
  },
  {
    name: 'Custom Arch',
    price: '85€',
    features: ['Гъвкава арка с персонализирана форма и дизайн', 'Допълнителни балони и елементи по избор'],
    button: 'Запази',
  },
  {
    name: 'Arch Stativ',
    price: '100€',
    features: ['Арка статив', 'Персонализиран надпис с малко пано', 'Допълнителни елементи по избор'],
    button: 'Запази',
  },
];

const portfolioItems = [];


const faqs = [
  {
    q: 'Как мога да резервирам вашите услуги?',
    a: 'Свържете се с нас чрез телефона, Instagram или формата за контакт на сайта. Ще обсъдим вашето събитие, предпочитанията ви и ще потвърдим резервацията.',
  },
  {
    q: 'Предлагате ли доставка и монтаж?',
    a: 'Да. Предлагаме доставка и професионален монтаж и демонтаж на декорациите според локацията и избрания пакет във Варна.',
  },
  {
    q: 'Изисква ли се капаро?',
    a: 'Не, за потвърждение на резервацията не се изисква капаро. Плащането се извършва в брой, по банков път (DSK) или чрез Revolut.',
  },
  {
    q: 'Мога ли да избера персонализирани цветове?',
    a: 'Разбира се. Можете да изберете цветове, които да съответстват на темата, стила и атмосферата на вашето събитие.',
  },
  {
    q: 'Пътувате ли за събития извън града?',
    a: 'Да. Предлагаме декорации и за събития извън Варна, но в околията. Допълнителната такса за транспорт зависи от разстоянието и локацията.',
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');

  const categories = ['All', 'Birthdays', 'Baby Shower', 'Gender Reveal', 'Wedding', 'Corporate'];
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'varna.archstudio@gmail.com';
  const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';
  const filteredPortfolio =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const openLightbox = (item, index) => setLightbox({ item, index });
  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const list = filteredPortfolio;
    const nextIndex = (lightbox.index + direction + list.length) % list.length;
    setLightbox({ item: list[nextIndex], index: nextIndex });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('sending');

    const messageBody = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Event Type: ${formData.eventType}`,
      `Date: ${formData.date}`,
      '',
      'Message:',
      formData.message,
    ].join('\n');

    try {
      if (contactEndpoint) {
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            eventType: formData.eventType,
            date: formData.date,
            message: formData.message,
          }),
        });

        if (!response.ok) {
          throw new Error('The submission service did not accept the request.');
        }
      } else {
        const recipient = contactEmail;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent('New inquiry from Balloon & Arches')}&body=${encodeURIComponent(messageBody)}`;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent('New inquiry from Balloon & Arches')}&body=${encodeURIComponent(messageBody)}`;

        try {
          window.open(gmailLink, '_blank', 'noopener,noreferrer');
        } catch {
          window.location.href = mailtoLink;
        }
      }

      setFormData({ name: '', email: '', eventType: '', date: '', message: '' });
      setFormStatus('sent');
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  return (
    <div className="page-shell">
      <header className="nav-shell">
        <div className="brand">
          <img src="/logo.png" alt="Balloon & Arches logo" className="brand-logo" />
          <div>
            <p>Balloon & Arches</p>
            <small>Event Decor</small>
          </div>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>За нас</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Услуги</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Цени</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Контакти</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-label">
              <span className="hero-pill">Now booking in Varna</span>
              <span>Designed for unforgettable celebrations</span>
            </motion.p>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
              Създаваме празници, които се помнят.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="hero-subtitle">
              Създаваме модерна декорация с балони за сватби, рождени дни, кръщенета, бебешки партита, корпоративни събития и всички специални моменти, които заслужават да бъдат запомнени.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="hero-actions">
              <a href="#contact" className="btn btn-primary">Запази своята дата</a>
              <a href="#services" className="btn btn-secondary">Изберете своята декорация</a>
            </motion.div>

          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="hero-box glass-card">
              <div className="hero-visual-inner">
                <div className="hero-image"></div>
              </div>
            </div>
          </motion.div>

          <div className="hero-floating">
            <div className="floating-balloon balloon-a"></div>
            <div className="floating-balloon balloon-b"></div>
            <div className="floating-balloon balloon-c"></div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p>За нас</p>
            <h2>Създаваме елегантни декорации за празници, които остават в спомените.</h2>
          </div>
          <div className="about-grid">
            <motion.div className="about-copy" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <p>
                Balloon & Arches съчетава качествени материали, изискан дизайн и бърз монтаж за незабравими празненства с елегантна и персонална атмосфера.
Всяко събитие е внимателно проектирано, за да създаде впечатляваща обстановка, която вашите гости ще запомнят и споделят.
              </p>
            </motion.div>
            <div className="about-cards">
              {[
                { title: 'Премиум качество', description: 'Висококачествени балони, стилни текстури и впечатляващи завършващи детайли.' },
                { title: 'Персонализирани дизайни', description: 'Всяка концепция е създадена специално според вашата цветова палитра и стила на вашето събитие.' },
                { title: 'Бърз монтаж', description: 'Професионална и организирана подготовка, за да бъде всичко готово навреме.' },
                { title: 'Професионален екип', description: 'Опитни стилисти се грижат за перфектното изпълнение от началото до края.' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                >
                  <div className="feature-accent" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section section-muted">
          <div className="section-heading">
            <p>Услуги</p>
            <h2>Декоративни пакети за всяко специално празненство.</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="service-image" style={{ backgroundImage: `url(${service.image})` }} />
                <div className="service-content">
                  <span className="service-tag">{service.title}</span>
                  <h3>{service.title1}</h3>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section pricing-section">
          <div className="section-heading">
            <p>Ценоразпис</p>
            <h2>Персонализирани пакети с елегантни детайли и стилна визия.</h2>
          </div>
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <motion.div
                key={plan.name}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {plan.popular && <span className="badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <ul>
                  {plan.features.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <button className="btn btn-primary" onClick={scrollToContact} type="button">{plan.button}</button>
              </motion.div>
            ))}
          </div>
        </section>

       

        {lightbox && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
              <img src={lightbox.item.src} alt={lightbox.item.label} />
              <div className="lightbox-meta">
                <span>{lightbox.item.category}</span>
                <p>{lightbox.item.label}</p>
                <small>Curated for luxury celebrations with premium balloons and custom styling.</small>
              </div>
              <div className="lightbox-actions">
                <button type="button" className="btn btn-secondary" onClick={() => navigateLightbox(-1)}>
                  Previous
                </button>
                <button type="button" className="close-button" onClick={() => setLightbox(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => navigateLightbox(1)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="section why-section">
          <div className="section-heading">
            <p>Защо да изберете нас</p>
            <h2>Защо клиентите се доверяват на Balloon & Arches.</h2>
          </div>
          <div className="why-grid">
            {['Професионален монтаж', 'Висококачествени балони', 'Модерен дизайн', 'Внимание към детайла', 'Бърза доставка и монтаж', 'Достъпни цени'].map((point) => (
              <motion.div key={point} className="why-card" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                <div className="why-icon">★</div>
                <p>{point}</p>
              </motion.div>
            ))}
          </div>
        </section>


        <section className="section faq-section">
          <div className="section-heading">
            <p>Често задавани въпроси</p>
            <h2>Отговори на най-често задаваните въпроси.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p>Контакти</p>
            <h2>Планирайте вашето специално събитие още днес.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card glass-card">
              <h3>Свържете се с нас</h3>
              <p>Телефон</p>
              <a href="tel:+358877090430">0897331552</a>
              <p>Instagram</p>
              <a href="https://instagram.com/archstudio_varna" target="_blank" rel="noreferrer">@archstudio_varna</a>
              <p>Локация</p>
              <p>Varna, Bulgaria</p>
            </div>
            <div className="contact-form-card glass-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    Имена
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Вид на събитието
                    <input type="text" name="eventType" value={formData.eventType} onChange={handleFormChange} placeholder="Сватбени украси, рожден ден..." required />
                  </label>
                  <label>
                    Дата
                    <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
                  </label>
                </div>
                <label>
                  Описание на събитието
                  <textarea name="message" rows="4" value={formData.message} onChange={handleFormChange} required />
                </label>
                <button type="submit" className="btn btn-primary" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Изпращане...' : 'Изпрати запитване'}
                </button>
                {formStatus === 'sent' && <p className="form-success">Благodарим ви! Ще се свържем с вас възможно най-скоро.</p>}
                {formStatus === 'error' && <p className="form-error">Нещо се обърка. Моля, опитайте отново или се свържете с нас директно.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Balloon & Arches</strong>
          <p>Designed for unforgettable celebrations.</p>
        </div>
        <div className="footer-links">
          <a href="#about">За нас</a>
          <a href="#services">Услуги</a>
          <a href="#contact">Контакти</a>
        </div>
        <div>
          <p>Instagram</p>
          <a href="https://instagram.com/archstudio_varna" target="_blank" rel="noreferrer">@archstudio_varna</a>
          <p>Телефон</p>
          <a href="tel:+358877090430">0897331552</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
