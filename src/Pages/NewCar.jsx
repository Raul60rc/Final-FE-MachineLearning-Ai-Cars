import BookCar from "../components/BookCar";
import Footer from "../components/Footer";

export function NewCar() {
    return (
        <>
      <section className="contact-page">
        <br />
        <div className="container">
          <div className="cookies">
            <div>
                <BookCar />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
    );
}

export default NewCar;