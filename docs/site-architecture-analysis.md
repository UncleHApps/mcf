# Site Architecture & Content Analysis

Following our market research, persona alignments, and visibility audits, this document evaluates the current structural layout of the Mas Freight website and identifies the necessary content gaps to bridge before the launch.

---

## 1. Page Structure Diagram

Below is a visual mapping of the current site architecture versus the **ideal** architecture needed to capture our SEO and persona strategies. 

```mermaid
graph TD
    %% Core Nodes
    Home[<b>Home Page</b><br>/index.html]
    Contact[<b>Contact / Quote</b><br>/contact.html & /quote-refinement.html]
    ImpExp[<b>Import & Export Overview</b><br>/import-export.html]
    
    %% Current Route Pages
    subgraph Route Pages (Destination SEO)
        Zim[Zimbabwe Freight<br>/cross-border-freight-zimbabwe.html]
        Zam[Zambia Freight<br>/cross-border-freight-zambia.html]
        Mal[Malawi Freight<br>/cross-border-freight-malawi.html]
    end
    
    %% Current Industry/Service Pages
    subgraph Service & Industry Pages (Intent SEO)
        Haz[Hazchem Transport<br>/dedicated-hazchem-freight.html]
        Gen[General Cargo FTL<br>/general-cargo-ftl-freight.html]
        Min[Mining & Industrial<br>/mining-industrial-chemical-transport.html]
        Agr[Agri & Farming<br>/agricultural-farming-logistics.html]
        Con[Construction & Mfg<br>/construction-manufacturing-freight.html]
    end

    %% Missing/Suggested Hubs
    subgraph Missing Critical Content
        RIB[<b>Customs & RIB Info</b><br>(New Page Needed)]
        Trust[<b>Reviews & Case Studies</b><br>(New Page Needed)]
        Driver[<b>Broker vs. Asset-Owner</b><br>(Persona Landing Page)]
    end

    %% Connections
    Home --> ImpExp
    Home --> Route Pages
    Home --> Service & Industry Pages
    Home --> Contact
    
    ImpExp --> Zim & Zam & Mal
    
    %% Dotted lines for suggested structural additions
    Home -.-> Missing Critical Content
    Contact -.-> Trust
```

---

## 2. Content & Copy Analysis

### The Good (What is currently working):
- **Core Messaging:** The phrase *"Own the Truck, Own the Result"* is heavily featured on the homepage. This successfully contrasts Mas Freight against unreliable brokers.
- **Service & Route Segmentation:** Having dedicated HTML pages for Zimbabwe, Zambia, and Malawi is excellent for traditional SEO. Splitting out *Hazchem* from *Agriculture* allows for tailored metadata.
- **Customs Integration:** The "Remover in Bond (RIB) Advantage" section on the region pages (like Malawi) perfectly targets the **End Buyer Persona** who worries about border bottlenecks.

### The Problem Areas (Where copy fails our personas):
- **Too Broad on the Homepage:** The homepage tries to speak to everyone at once. We need specific sections that call out our two personas: *"Are you an exporter quoting DAP?"* (Supplier Persona) vs *"Are you waiting on critical imports?"* (Buyer Persona).
- **Lack of Trust Validation:** The homepage has a "Trusted By" logo banner, but there is zero integration of the *Google Business Profile* reviews. If we are struggling with only 3 GBP reviews, the website *must* overcompensate with deep, authored testimonials or case studies.
- **Dry FAQ Structures:** The FAQs on the region pages are good, but they are buried at the bottom. The answers regarding "5-7 days to Zimbabwe" should be massive hero-section bullet points, not hidden inside accordions.

---

## 3. Major Gaps & Action Items Before Launch

Based on our SEO plan and the analysis of the `src/` files, here are the major gaps we must fill:

### Gap 1: No Persona-Specific "Bridging" Pages
We identified that Exporters (worried about margins) and Importers (worried about time) buy differently. 
- **Action:** Create a dedicated landing page specifically addressing the "Hidden Costs of Brokers" to capture the Supplier persona.

### Gap 2: Under-utilization of the "Customs RIB" Advantage
The Customs RIB license is Mas Freight's biggest operational differentiator for avoiding Beitbridge delays. While it's mentioned on the route pages, it doesn't have its own optimized hub.
- **Action:** Create a `/customs-rib-clearance.html` page. This will capture long-tail questions like *"How to avoid VAT at Beitbridge"* and serve as the ultimate Lead Magnet for the Buyer persona.

### Gap 3: Missing Social Proof & GBP Sync
The visibility audit showed a vulnerable GBP profile. 
- **Action:** Build a static `Review / Case Study` section on the site that actively links to the Google Business Profile, prompting users to leave reviews and visually anchoring the website to the physical Isando map-pack location.

### Gap 4: Misaligned Headings (H1/H2)
The route pages (e.g., Malawi) have H1s like *"Reliable, Direct FTL Freight to Malawi"*. 
- **Action:** Rewrite these to be hyper-specific to the keyword research: *"34-Ton FTL Freight South Africa to Malawi | Mas Freight"*.
