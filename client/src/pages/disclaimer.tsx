import React from "react";
const Disclaimer = () => {
return (
  <div className="d-flex justify-content-center my-3" style={{width:'100%'}}>
<div style={{maxWidth:'800px'}}>
  <h2 style={{textAlign:'center'}}> Welcome to PediaGeek.</h2>
  <h4 style={{textAlign:'center'}}>PediaGeek is the best way to express your idea to the World.</h4>
  <p>This page explains the disclaimer for using PediaGeek services present in the URL <a
      href='pediageek.com'>pediageek.com</a>.Read the below points before taking any actions directly or indirectly
    mentioned in some article of our website</p>
  <h3>CONTENTS</h3>
  <hr/>
  <div>
    <ol>
      <li><a href="#sec1">Disclaimer</a></li>
      <li><a href="#sec2">Consent</a></li>
      <li><a href="#sec3">Update</a></li>
    </ol>
  </div>
  <hr />
  <h2 id="sec1">Disclaimers for PediaGeek</h2>
  <p>All the information on this website - <a href='pediageek.com'>pediageek.com</a>- is published in good faith and for
    general information purpose only. PediaGeekdoes not make any warranties about the completeness, reliability and
    accuracy of this information. Any action you take upon the information you find on this website --PediaGeek--, is
    strictly at your own risk. PediaGeek will not be liable for any losses and/or damages in connection with the use of
    our website.</p>
  <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to
    provide only quality links to useful and ethical websites, we have no control over the content and nature of these
    sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site
    owners and content may change without notice and may occur before we have the opportunity to remove a link which may
    have gone 'bad'.</p>
  <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms
    which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of
    Service" before engaging in any business or uploading any information.</p>
  <h2 id="sec2">Consent</h2>
  <p>By using ourwebsite, you hereby consent to our disclaimer and agree to its terms.</p>
  <h2 id="sec3">Update</h2>
  <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>

</div>
</div>
);
};

export default Disclaimer;