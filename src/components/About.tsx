const Creator = ({ name, url }: { name: string; url: string }) => (
  <a target="_blank" rel="noreferrer" href={url}>
    {name}
  </a>
);

const About = () => {
  return (
    <div className="d-flex about-wrapper justify-content-center align-items-center">
      <div className="about">
        <img src="/kite.png" alt="kite" />
        <h1>Kite</h1>
        <p>
          This chat app is made by{" "}
          <Creator url="https://alfie.vercel.app" name="Tarun" /> and{" "}
          <Creator url="https://pavanteja.netlify.app" name="Pavan Teja" />
        </p>
        <p>Stay Home, Stay Safe &#10084;</p>
      </div>
    </div>
  );
};

export default About;
