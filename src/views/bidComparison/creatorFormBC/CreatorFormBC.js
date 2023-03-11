import React from "react";
import HeaderBC from './sections/HeaderBC';
import FromGroupBC from './sections/FormGroupBC';

const CreatorFormBC = ({data, sessionData}) => {
  return (
    <React.Fragment>
      <HeaderBC data={data} sessionData={sessionData} />
      <FromGroupBC data={data} sessionData={sessionData} />
    </React.Fragment>
  );
};

export default CreatorFormBC; 
