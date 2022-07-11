import Helmetglobal from "../components/global/Helmetglobal";
import { RootStore } from '../utils/TypeScript'
import { useSelector } from 'react-redux';
const About = () => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className={`d-flex justify-content-center my-3 text-${isdarkMode?'white':'black'}`} style={{ width: '100%' }}>
      <Helmetglobal title="About us" description="Pediageeek is the place to express your ideas and views." keyword="aboutus,pediageek" />
      <div style={{ maxWidth: '800px' }}>

        <h1 style={{ textAlign: "center" }}>Welcome to PediaGeek&nbsp;</h1>
        <p style={{ textAlign: "center" }}>
          <b>PediaGeek is the best way to express your ideas to the World.</b>
        </p>
        <p style={{ textAlign: "left" }}>
          We are happy that you want to know something more about PediaGeek.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>1. Introduction&nbsp;</p>
        <p style={{ textAlign: "left" }}>2. Mission&nbsp;</p>
        <p style={{ textAlign: "left" }}>3. About PediaGeek&nbsp;</p>
        <p style={{ textAlign: "left" }}>4. Services&nbsp;</p>
        <p style={{ textAlign: "left" }}>5. Founder Words&nbsp;</p>
        <p style={{ textAlign: "left" }}>
          Nowadays people are more dependent on online products and services that's
          why We have also taken a step to keep people updated with the Variety of
          Blogs fields with fresh content of the Variety of Blogs. Our priority is to
          provide to you with better updates and information from the Variety of
          Blogs.
        </p>
        <h2 style={{ textAlign: "left" }}>Our Mission&nbsp;</h2>
        <p style={{ textAlign: "left" }}>
          There are hundreds of websites created every second, and many meet a dead
          end every second the major cause for this dead-end is the fake and
          invaluable content that they provide. So, our main goal is to provide you
          100% original, safe, fresh, and useful content in the Variety of Blogs,
          which is most important to have a great experience in the world wide web and
          internet era. So, we mainly focus on our service and improving it regularly
          to provide a better user experience to all the users. We focus on the
          Variety of Blogs niche, so, our main priority is to search for new content
          and present it in front of you to make you learn something new and bring out
          your better version.
        </p>
        <h2 style={{ textAlign: "left" }}>Services&nbsp;</h2>
        <p style={{ textAlign: "left" }}>
          We are mainly focused on the Variety of Blogs category. So, we have tried to
          proceed with your most relevant content in the mentioned direction. If you
          are interested in a Variety of Blogs then you can visit daily to get more
          latest information. Also, We provide a Notification update service, so that
          you can join by email and other Social Media Platforms. You can get all the
          links on the contact page of our website if you visit now.
        </p>
        <h2 style={{ textAlign: "left" }}>About PediaGeek</h2>
        <p style={{ textAlign: "left" }}>
          As you can see We have already mentioned what our goal and service are.
          Again, We repeat that We mainly focus on the Variety of Blog Categories to
          help people.PediaGeek is dedicated to providing you the best, with a focus
          on dependability and Creating your space on the internet without much
          hesitation. This Website is created only to help people because many people
          are still spending hours to get exact information. So, this is the only
          motive to create PediaGeek. To help people and provide them a better web
          experience. Now, it is time for some words from the PediaGeek founder-
        </p>
        <p style={{ textAlign: "left" }}>
          From my point of view, many people visit the internet to get some
          information but 90% of the time they get the wrong information, so, the
          priority of our website PediaGeek is to provide 100% legit and accurate
          information to our users. Also, We hope our dream comes true one day, and
          our website will provide Original Content to provide a better user
          experience. So, from my side, thanks for visiting our website.
        </p>
        <p style={{ textAlign: "left" }}>&nbsp;(Founder PediaGeek)</p>
        <h2 style={{ textAlign: "left" }}>Contact&nbsp;</h2>
        <p style={{ textAlign: "left" }}>
          This website is only for you, so, anything you don't like please mention to
          us through the comment section. Contact us through the mentioned link. If
          you require any more information or have any questions about PediaGeek,
          please feel free to contact us. Team PediaGeek is working to turn its
          passion into a booming online website. We hope you enjoy our services as
          much as We enjoy offering them to you. We will keep posting more important
          posts on our Website for all of you. Please give your support and love.
        </p>
        <h4 style={{ textAlign: "left" }}>
          <div style={{ textAlign: "center" }}>
            Thank you for Visiting our Creation.&nbsp;
          </div>
          <div style={{ textAlign: "center" }}>Have a nice day.</div>
        </h4>

      </div>
    </div>
  );
};

export default About;