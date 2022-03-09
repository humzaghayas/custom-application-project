import React,{ useState } from "react";
import messages from './messages';
import PropTypes from 'prop-types';
import { useMcMutation } from '@commercetools-frontend/application-shell';
import { useIntl } from 'react-intl';
import { ContentNotification } from '@commercetools-uikit/notifications';
import CreateClaimObject from './create-custom-object.ctp.graphql';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;
const UploadClaim = () => {

  const [claimno, setClaimno] = useState('');
  const [orderno, setOrderno] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [prdSku, setPrdSku] = useState('');
  const [prdQty, setPrdQty] = useState('');

  const [createOrUpdateCustomObject, { data, loading, error }] = useMcMutation(CreateClaimObject);

  const handleClick = (e) => { 
    e.preventDefault();  
       
    console.log('this is:' +claimno);  

    var value = "{\"claimno\":\""+claimno+"\",\"orderNo\":\""+orderno+"\",\"imgUrl\":\""+imgUrl+"\",\"sku\":\""+prdSku+"\",\"quantity\":\""+prdQty+"\"}";
    var draftObj ={"key": claimno,"container": "claim-container","value": value};
    createOrUpdateCustomObject({ variables: {
            draft: draftObj,
          },
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          } });
    

    alert('Claim Created!: ');
  };

  return (
    <div className="UploadClaim">
      <form onSubmit={handleClick}>


      <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
      <Text.Headline as="h2">Upload Claim</Text.Headline>
        <Text.Body>Claims</Text.Body>
        </Spacings.Stack>
        
        <Spacings.Inline>
            <label>Claim No:</label>
            <input type="text" name="claimno" id="claimno" 
                value={claimno} onChange={evt => setClaimno(evt.target.value)}/><br/><br/>
        </Spacings.Inline>

        <Spacings.Inline>
            <label>Order No:</label>
            <input type="text" name="ordno" id="ordno" 
              value={orderno} onChange={evt => setOrderno(evt.target.value)}/><br/><br/>
        </Spacings.Inline>

        <Spacings.Inline>
              <label>Image URL:</label>
              <input type="text" name="imgurl" id="imgurl"
                  value={imgUrl} onChange={evt => setImgUrl(evt.target.value)}/><br/><br/>
        </Spacings.Inline>

        <Spacings.Inline>
              <label>Product SKU:</label>
              <input type="text" name="prodsku" id="prodsku"
                  value={prdSku} onChange={evt => setPrdSku(evt.target.value)}/><br/><br/>
        </Spacings.Inline>

        <Spacings.Inline>
            <label>Product Quantity:</label>
            <input type="text" name="prodqty" id="prodqty"
                value={prdQty} onChange={evt => setPrdQty(evt.target.value)}/><br/><br/>
        </Spacings.Inline>

        <Spacings.Inline>
              <button onClick={handleClick}>Submit</button>
        </Spacings.Inline>
        
        </Spacings.Stack>
      </form>
    </div>
  );
};

UploadClaim.displayName = 'Upload Claim';
UploadClaim.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default UploadClaim;