import React, { useState } from 'react';
import '../styles/BottomHeader.css';

const BottomHeader: React.FC = () => {
  const [language, setLanguage] = useState('Рус');
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="bottom-header">
      <div className="bottom-header-column logo">QPICK</div>

      <div className="bottom-header-column">
        <ul className="bottom-header-links">
          <li onClick={() => window.location.href = '/favourites'}>
            {language === 'Рус' ? 'Избранное' : 'Favorites'}</li>
          <li onClick={() => window.location.href = '/cart'}>
            {language === 'Рус' ? 'Корзина' : 'Cart'}
          </li>
          <li onClick={() => setContactModalOpen(true)}>
            {language === 'Рус' ? 'Контакты' : 'Contacts'}
          </li>
        </ul>
      </div>

      <div className="bottom-header-column">
        <ul className="bottom-header-links">
          <li onClick={() => setTermsModalOpen(true)}>
            {language === 'Рус' ? 'Условия сервиса' : 'Service Terms'}
          </li>
        </ul>
        <div className="language-switcher">
          <img src="/images/Group.png" alt="Globe Icon" className="language-icon" />
          <span
            className={`language ${language === 'Рус' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('Рус')}
          >
            Рус
          </span>
          <span
            className={`language ${language === 'Eng' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('Eng')}
          >
            Eng
          </span>
        </div>
      </div>

      <div className="bottom-header-column-zero social-icons">
        <img src="/images/vk.png" alt="VK" onClick={() => handleRedirect('https://vk.com')} />
        <img src="/images/telegram.png" alt="Telegram" onClick={() => handleRedirect('https://telegram.org')} />
        <img src="/images/whatsapp.png" alt="WhatsApp" onClick={() => handleRedirect('https://www.whatsapp.com')} />
      </div>

      {isContactModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{language === 'Рус' ? 'Телефон: +7 (999) 999-99-99' : 'Phone: +7 (999) 999-99-99'}</p>
            <button onClick={() => setContactModalOpen(false)}>{language === 'Рус' ? 'ОК' : 'OK'}</button>
          </div>
        </div>
      )}

      {isTermsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{language === 'Рус' ? 'Здесь можно разместить условия сервиса...' : 'Here you can place service terms...'}</p>
            <button onClick={() => setTermsModalOpen(false)}>{language === 'Рус' ? 'ОК' : 'OK'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomHeader;
