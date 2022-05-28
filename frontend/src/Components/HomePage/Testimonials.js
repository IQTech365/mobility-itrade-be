import React from "react";
import "./styles.css";
import GuestImg1 from "../../Assets/GuestImg1.png";
import Swiper from "react-id-swiper";

const Testimonials = () => {
  const params = {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  return (
    <section className="testimonials py-75">
      <div className="container-fluid">
        <h2 className="font-weight-bold text-center pt-5">Testimonials</h2>
        <Swiper {...params}>
          <div>
            <div id="customers-testimonials" className="owl-carousel">
              <div className="item">
                <div className="shadow-effect">
                  <img
                    className="mx-auto mb-4 img-fluid"
                    src={GuestImg1}
                    alt="img"
                  />
                  <p className="text-secondary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget sapien sit amet sapien dignissim tincidunt
                    eget ut metus. Suspendisse potenti. Sed ut nunc eleifend,
                    tristique odio sit amet, feugiat mi. Fusce sed dolor
                    volutpat, porta massa vel, gravida lectus.
                  </p>
                  <h6 className="font-weight-bold mb-0">Lorem Winstone</h6>
                  <p className="text-secondary mb-0">CEO, Designmedia</p>
                  <div className="testimoni_border_box" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="customers-testimonials" className="owl-carousel">
              <div className="item">
                <div className="shadow-effect">
                  <img
                    className="mx-auto mb-4 img-fluid"
                    src={GuestImg1}
                    alt="img"
                  />
                  <p className="text-secondary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget sapien sit amet sapien dignissim tincidunt
                    eget ut metus. Suspendisse potenti. Sed ut nunc eleifend,
                    tristique odio sit amet, feugiat mi. Fusce sed dolor
                    volutpat, porta massa vel, gravida lectus."
                  </p>
                  <h6 className="font-weight-bold mb-0">Lorem Winstone</h6>
                  <p className="text-secondary mb-0">CEO, Designmedia</p>
                  <div className="testimoni_border_box" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="customers-testimonials" className="owl-carousel">
              <div className="item">
                <div className="shadow-effect">
                  <img
                    className="mx-auto mb-4 img-fluid"
                    src={GuestImg1}
                    alt="img"
                  />
                  <p className="text-secondary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget sapien sit amet sapien dignissim tincidunt
                    eget ut metus. Suspendisse potenti. Sed ut nunc eleifend,
                    tristique odio sit amet, feugiat mi. Fusce sed dolor
                    volutpat, porta massa vel, gravida lectus."
                  </p>
                  <h6 className="font-weight-bold mb-0">Lorem Winstone</h6>
                  <p className="text-secondary mb-0">CEO, Designmedia</p>
                  <div className="testimoni_border_box" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="customers-testimonials" className="owl-carousel">
              <div className="item">
                <div className="shadow-effect">
                  <img
                    className="mx-auto mb-4 img-fluid"
                    src={GuestImg1}
                    alt="img"
                  />
                  <p className="text-secondary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget sapien sit amet sapien dignissim tincidunt
                    eget ut metus. Suspendisse potenti. Sed ut nunc eleifend,
                    tristique odio sit amet, feugiat mi. Fusce sed dolor
                    volutpat, porta massa vel, gravida lectus."
                  </p>
                  <h6 className="font-weight-bold mb-0">Lorem Winstone</h6>
                  <p className="text-secondary mb-0">CEO, Designmedia</p>
                  <div className="testimoni_border_box" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="customers-testimonials" className="owl-carousel">
              <div className="item">
                <div className="shadow-effect">
                  <img
                    className="mx-auto mb-4 img-fluid"
                    src={GuestImg1}
                    alt="img"
                  />
                  <p className="text-secondary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget sapien sit amet sapien dignissim tincidunt
                    eget ut metus. Suspendisse potenti. Sed ut nunc eleifend,
                    tristique odio sit amet, feugiat mi. Fusce sed dolor
                    volutpat, porta massa vel, gravida lectus."
                  </p>
                  <h6 className="font-weight-bold mb-0">Lorem Winstone</h6>
                  <p className="text-secondary mb-0">CEO, Designmedia</p>
                  <div className="testimoni_border_box" />
                </div>
              </div>
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};
export default Testimonials;
