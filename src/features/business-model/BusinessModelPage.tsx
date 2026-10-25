const documentUrl='/documents/matchline-business-model.pdf';

export function BusinessModelPage(){
 return <section className="page document-page" aria-labelledby="business-model-title">
  <div className="document-heading">
   <div>
    <p className="eyebrow">Matchline document</p>
    <h1 id="business-model-title">Business model</h1>
    <p>Read the Matchline business model, value proposition, and planned product direction.</p>
   </div>
   <a className="button primary" href={documentUrl} download>Download PDF</a>
  </div>
  <div className="document-viewer">
   <iframe title="Matchline Business Model PDF" src={documentUrl}>
    <p>Your browser cannot display this PDF. <a href={documentUrl}>Open the business model PDF</a>.</p>
   </iframe>
  </div>
  <p className="fine-print">If the preview does not load, <a href={documentUrl}>open the PDF in a new tab</a>.</p>
 </section>
}
