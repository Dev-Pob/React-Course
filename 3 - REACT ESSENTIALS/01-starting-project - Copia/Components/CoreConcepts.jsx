import CoreConcept from "../Components/CoreConcept.jsx";
import {CORE_CONCEPTS} from "../src/data.js";
import Section from "./Section.jsx";

export default function CoreConcepts(){
    return(
        <Section title="Core concepts" id="core-concepts">
          <ul>
          {CORE_CONCEPTS.map((conceptItem) => (<CoreConcept key={conceptItem.title} {...conceptItem}/>))}
          </ul>
        </Section>
    );
}