import React from "react";

const SuscriptionBanner = () => (
  <div className="subscribe">
    <h2 className="subscribe__title">Suscribite a nuestro boletín</h2>
    <p className="subscribe__copy">
      Te gustaría conocer nuestras promociones y novedades navideñas?.
    </p>
    <div className="form">
      <input
        type="email"
        className="form__email"
        placeholder="Facilitanos tu correo electrónico"
      />
      <button type="button" className="btn-pay btn form__button">
        Enviar
      </button>
    </div>
  </div>
);

export default SuscriptionBanner;
