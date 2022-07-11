import React from "react";
import { RootStore } from '../utils/TypeScript'
import { useSelector } from 'react-redux';
const Disclaimer = () => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className={`d-flex justify-content-center my-3 text-${isdarkMode?'white':'black'}`} style={{ width: '100%' }}>
      <div style={{ maxWidth: '800px' }}>
        <>
          <h1 style={{ textAlign: "center" }}>Welcome to PediaGeek&nbsp;</h1>
          <p>
            This page explains the disclaimer for using PediaGeek services present in
            the URL pediageek.com.Read the below points before taking any actions
            directly or indirectly mentioned in some articles on our website.
          </p>
          <h2 style={{ textAlign: "left" }}>CONTENTS&nbsp;</h2>
          <p>1. Disclaimer&nbsp;</p>
          <p>2. Consent&nbsp;</p>
          <p>3. Update&nbsp;</p>
          <h2 style={{ textAlign: "left" }}>Disclaimers for PediaGeek&nbsp;</h2>
          <p>
            All the information on this website - pediageek.com- is published in good
            faith and for general information purposes only. PediaGeek does not make any
            warranties about the completeness, reliability, and accuracy of this
            information. Any action you take upon the information you find on this
            website --PediaGeek--, is strictly at your own risk. PediaGeek will not be
            liable for any losses and/or damages in connection with the use of our
            website.&nbsp;
          </p>
          <p>
            From our website, you can visit other websites by following hyperlinks to
            such external sites. While we strive to provide only quality links to useful
            and ethical websites, we have no control over the content and nature of
            these sites. These links to other websites do not imply a recommendation for
            all the content found on these sites. Site owners and content may change
            without notice and may occur before we have the opportunity to remove a link
            that may have gone 'bad'.
          </p>
          <p>
            &nbsp;Please, also be aware that when you leave our website, other sites may
            have different privacy policies and terms that are beyond our control.
            Please be sure to check the Privacy Policies of these sites as well as their
            "Terms of Service" before engaging in any business or uploading any
            information.
          </p>
          <h2 style={{ textAlign: "left" }}>Consent</h2>
          <p>
            By using our website, you hereby consent to our disclaimer and agree to its
            terms.
          </p>
          <h2 style={{ textAlign: "left" }}>Update&nbsp;</h2>
          <p>
            Should we update, amend or make any changes to this document, those changes
            will be prominently posted here.
          </p>
        </>

      </div>
    </div>
  );
};

export default Disclaimer;