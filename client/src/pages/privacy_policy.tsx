import React from "react";
import { RootStore } from '../utils/TypeScript'
import { useSelector } from 'react-redux';
import Helmetglobal from "../components/global/Helmetglobal";
const Privacy_policy = () => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className={`d-flex justify-content-center my-3 text-${isdarkMode?'white':'black'}`} style={{ width: '100%' }}>
       <Helmetglobal title="Privacy Policy - PediaGeek" description="This page explains all the legal rights of a person to use our website and his roles.." keyword="privacy,policy ,pediageek" />
     
      <div style={{ maxWidth: '800px' }}>

        <h1 style={{ textAlign: "center" }}>Welcome to PediaGeek&nbsp;</h1>
        <p style={{ textAlign: "center" }}>
          <b>PediaGeek is the best way to express your ideas to the World.</b>
        </p>
        <p>
          When you use Our services managed in the URL pediageek.com means you are
          trusting us with your information and We understand it is Our great
          responsibility to make your data and information safe with us. This page
          explains how, when, and why a particular data is collected from your side
          and when the information gets erased from us.
        </p>
        <h2 style={{ textAlign: "left" }}>
          What, when, where? We collect information.&nbsp;
        </h2>
        <p>
          We collect information to improve Our services for you as well as for Our
          other users. Information you provide during sign-up.
        </p>
        <p>
          We collect your basic data during sign-up to identify you and to provide you
          better results. Basic information like E-mail id.&nbsp;
        </p>
        <p>
          E-mail ID is used for your further login to your account and it remains with
          us up to the termination of your account by you sometimes We also terminate
          your account from Our services to make Our platform free of spam and safe
          for other users.&nbsp;
        </p>
        <p>
          Other information is used to provide you better results and also to make Our
          platform safe for others.
        </p>
        <h2 style={{ textAlign: "left" }}>
          During commenting, reviewing, and sharing
        </h2>
        <p>
          We use your E-mail ID, name, and your content to show it to the other users
          as it helps us to provide trustworthy information about a topic or content
          to others on which you have commented or reviewed.
        </p>
        <h2 style={{ textAlign: "left" }}>Device information</h2>
        <p>
          We use your device information like device-width, browser type, version, etc
          in which you visit Our website, to increase your experience on Our
          platforms. Information such as device width adjust Our platform width
          accordingly and the type of browser and operating system to hide or show
          some extra features because every browser and operating system provides
          different features for its users .
        </p>
        <h2 style={{ textAlign: "left" }}>
          Retention and deletion of your information
        </h2>
        <p>
          We keep your data up to when you are with us and after that, We clean up
          everything related to you. But sometimes if you have commented in some
          places it takes some time to get deleted from us because commenting in other
          content, We count it as content creators' property in which you have
          commented or reviewed. For instant deletion of your comments, you can
          contact us and be sure We are always with you.&nbsp;
        </p>
        <h2 style={{ textAlign: "left" }}>Sharing of your information.</h2>
        <p>
          Sometimes We may share your basic information for business purposes. But
          data will be so basic that it will not harm your privacy. Business purpose
          includes sending you customized emails from third-party services to grab
          your attention towards Our website.
        </p>
        <h2 style={{ textAlign: "left" }}>Cookies&nbsp;</h2>
        <p>
          Like all other websites, Our website also uses cookies to show you more
          relevant products, services, and pages. cookies help to find your desired
          page more easily. Cookies are small pieces of codes stored in your system
          during your visit to Our website and it gets automatically erased after some
          days if you will not visit Our website frequently or you can erase it
          manually by erasing your browsing data. Learn more about cookies.&nbsp;
        </p>
        <h2 style={{ textAlign: "left" }}>
          Data used by an advertising network.&nbsp;
        </h2>
        <p>
          We used to advertise on Our website to generate revenue and to keep us live
          on the internet and these advertising networks may use some of your
          information to show you relevant ads which are useful for you but we don’t
          have any direct connection with them. &nbsp;
        </p>
        <h3 style={{ textAlign: "left" }}>Google -AdSense ads&nbsp;</h3>
        <p>
          Google Adsense is one of the major players in the ads network. Google is one
          of the third-party vendors on Our site. It also uses cookies, known as DART
          cookies, to serve ads to our site visitors based on their visit to
          www.website.com and other sites on the internet. However, visitors may
          choose to decline the use of DART cookies by visiting the Google ad and
          content network Privacy Policy at the following URL –
          https://policies.google.com/technologies/ads&nbsp;
        </p>
        <h3 style={{ textAlign: "left" }}>
          Advertising Partners Privacy Policies&nbsp;
        </h3>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective advertisements
          and links that appear on PediaGeek, which are sent directly to users'
          browser. They automatically receive your IP address when this occurs. These
          technologies are used to measure the effectiveness of their advertising
          campaigns and/or to personalize the advertising content that you see on
          websites that you visit. Note that PediaGeek has no access to or control
          over these cookies that are used by third-party advertisers.
        </p>
        <h2 style={{ textAlign: "left" }}>
          CCPA Privacy Rights (Do Not Sell My Personal Information)&nbsp;
        </h2>
        <p>
          Under the CCPA, among other rights, California consumers have the right to
          request that a business that collects a consumer’s personal data discloses
          the categories and specific pieces of personal data that a business has
          collected about consumers.
        </p>
        <p>
          Request that a business deletes any personal data about the consumer that a
          business has collected. Request that a business that sells a consumer's
          personal data, cannot sell the consumer's personal data. If you make a
          request, We have one month to respond to you. If you would like to exercise
          any of these rights, please contact us.
        </p>
        <h2 style={{ textAlign: "left" }}>GDPR Data Protection Rights</h2>
        <p>
          We would like to make sure that you are fully aware of all of your data
          protection rights. Every user is entitled to the following:&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to access – You have the right to request copies of your personal
          data. We may charge you a small fee for this service.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to rectification – You have the right to request that We correct
          any information you believe is inaccurate. You also have the right to
          request that We complete the information that you believe is
          incomplete.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to erase -You have the right to request that We erase your
          personal data, under certain conditions.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to restrict processing – You have the right to request that We
          restrict the processing of your personal data, under certain
          conditions.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to object to processing – You have the right to object to Our
          processing of your personal data, under certain conditions.&nbsp;
        </p>
        <p style={{ textAlign: "left" }}>
          The right to data portability – You have the right to request that We
          transfer the data that We have collected to another organization, or
          directly to you, under certain conditions.&nbsp;
        </p>
        <p>
          If you make a request, We have one month to respond to you. If you would
          like to exercise any of these rights, please contact us.&nbsp;
        </p>
        <h2 style={{ textAlign: "left" }}>Children's Information&nbsp;</h2>
        <p>
          Another part of Our priority is adding protection for children while using
          the internet. We encourage parents and guardians to observe, participate in,
          and/or monitor and guide their online activity. PediaGeek does not knowingly
          collect any Personal Identifiable Information from children under the age of
          13. If you think that your child provided this kind of information on Our
          website, We strongly encourage you to contact us immediately and We will put
          Our best efforts into promptly remove such information from Our records.
        </p>
        <h2 style={{ textAlign: "left" }}>Contact us&nbsp;</h2>
        <p>Address:India .&nbsp;</p>
        <p>Mobile no. :8114694441 .&nbsp;</p>
        <p>Email id:contact@pediageek.com&nbsp;</p>
        <p>Linkedin : https://www.linkedin.com/company/pediageek</p>
      </div>
    </div>

  );
};

export default Privacy_policy;