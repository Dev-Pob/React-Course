import TabButton from "./TabButton.jsx";
import {EXAMPLES} from "../src/data-with-examples.js";
import { useState} from 'react';
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";

export default function Examples(){
    const [ selectedTopic, setSelectedTopic ] = useState();


  function handleClick(selectedButton){
    setSelectedTopic(selectedButton);
  }

    let tabContent = "Chose the topic!";

    if (selectedTopic){
      tabContent=( 
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <code>
          {EXAMPLES[selectedTopic].code}
          </code>
        </div>
  
      );
    }
  
    return(
        <Section title="Examples" id="examples">
          <Tabs ButtonContainer="menu"
          button={<>
            <TabButton isSelected ={ selectedTopic === "components"} onClick={() => handleClick("components")}> Components </TabButton>
            <TabButton isSelected ={ selectedTopic === "jsx"} onClick={() => handleClick("jsx")}> JSX </TabButton>
            <TabButton isSelected ={ selectedTopic === "props"} onClick={() => handleClick("props")}> Props </TabButton>
            <TabButton isSelected ={ selectedTopic === "state"} onClick={() => handleClick("state")}> State </TabButton>
            </>}
          >
            {tabContent}
          </Tabs>

          </Section>
    );
}