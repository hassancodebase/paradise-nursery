import { ArrowDownRight, Leaf, Sprout, Sun } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="about-card">
      <div className="about-icon"><Leaf size={25} /></div>
      <p className="eyebrow">A little more green, every day</p>
      <h2>Good things grow <em>here.</em></h2>
      <p>
        At Paradise Nursery, we believe a plant can make a space feel more like
        home. We bring together beautiful, thoughtfully selected houseplants for
        first-time growers and lifelong plant lovers alike. From easy-care
        companions to leafy statement pieces, we make it simpler to find your
        next favorite and help it thrive.
      </p>
      <div className="about-values">
        <span><Sprout size={17} /> Plants for every level</span>
        <span><Sun size={17} /> Advice that helps you grow</span>
      </div>
      <a className="text-link" href="#welcome">Explore our little jungle <ArrowDownRight size={17} /></a>
    </section>
  );
}