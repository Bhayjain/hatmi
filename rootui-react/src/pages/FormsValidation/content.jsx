/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, CustomInput, Label, Input, FormFeedback } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          preview: '',
          file: null
        };
      }
    
      componentDidMount() {
        document.addEventListener('paste', this.handlePasteEvent);
      }
    
      componentWillUnmount() {
        document.removeEventListener('paste', this.handlePasteEvent);
      }



    handlePasteEvent = (event) => {
        const clipboardItems = event.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter((item) => {
          // Filter the image items only
          return /^image\//.test(item.type);
        });
        if (items.length === 0) {
          return;
        }
    
        const item = items[0];
        const blob = item.getAsFile();
        const preview = URL.createObjectURL(blob);
        const file = new File([blob], 'file name', {
          type: 'image/jpeg',
          lastModified: new Date().getTime()
        });

        console.log("khushbuuuuuuuuuuuuuuu",file);
        this.setState({ preview, file });
      };



    render() {
        return (
            <Fragment>

<div className="container">
        <div>
          <div>
            <kbd className="key">Ctrl</kbd> +{' '}
            <kbd className="key">V</kbd> in this window.
          </div>
          <img className="preview" src={this.state.preview} alt="preview" />
          <input id="file_input" type="file" accept="image/*" />
        </div>
      </div>


                {/* <Snippet
                    language="html"
                    preview
                    previewFrame
                    codeBefore={
                        [
                            'import { Row, Col, Button, CustomInput, Label, Input } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <form>
                        <Row className="vertical-gap sm-gap">
                            <Col xs={ 6 }>
                                <Label for="validationCustom01">Your name</Label>
                                <Input type="text" id="validationCustom01" placeholder="Name" invalid onChange={ () => {} } />
                                <FormFeedback>
                                    This value is invalid.
                                </FormFeedback>
                            </Col>
                            <Col xs={ 6 }>
                                <Label for="validationEmail">Your email</Label>
                                <Input type="email" id="validationEmail" aria-describedby="emailHelp" placeholder="Email" value="admin@test.com" valid onChange={ () => {} } />
                                <FormFeedback valid>
                                    This value is valid.
                                </FormFeedback>
                            </Col>
                            <Col xs="auto">
                                <CustomInput type="radio" id="validationMale" label="Male" name="customRadio" invalid onChange={ () => {} } />
                            </Col>
                            <Col xs="auto">
                                <CustomInput type="radio" id="validationFemale" label="Female" name="customRadio" invalid onChange={ () => {} } />
                            </Col>
                            <Col xs={ 12 }>
                                <CustomInput type="select" id="validationSelect" invalid onChange={ () => {} }>
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </CustomInput>
                            </Col>
                            <Col xs={ 12 }>
                                <CustomInput type="checkbox" id="validationCheckbox" label="I have read and agree to the terms and conditions" invalid onChange={ () => {} } />
                                <FormFeedback>
                                    You must agree before submitting.
                                </FormFeedback>
                            </Col>
                            <Col xs={ 12 }>
                                <Button color="brand" type="submit">Submit form</Button>
                            </Col>
                        </Row>
                    </form>
                </Snippet> */}
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
