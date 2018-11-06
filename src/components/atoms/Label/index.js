import React from 'react'
import T from 'proptypes'
import {
  branch,
  compose,
  defaultProps,
  renderNothing,
  setDisplayName,
  setPropTypes,
  withProps,
  withState,
  withHandlers,
  withStateHandlers,
} from 'recompose'
import styled, {cx, css} from 'react-emotion'
import {withTheme} from 'emotion-theming'
import * as Feather from 'react-feather'

import * as enums from '../../enums'
import {
  themed,
  themedBy,
  readableColor,
  shadeBy,
  transparentizeBy,
} from '../../theme'
import Icon from '../Icon'


const activeState = props => css`
  color: ${themed('component.label.text.color.active')(props)};
`


const disabledState = props => css`
  color: ${themed('component.label.text.color.disabled')(props)};
`


const dynamicLabelStyle = props => cx(
  props.isDisabled && disabledState(props),
)


const StyledLabel = styled('label')`
  display: block;
`


const Container = styled('div')`
`


const LabelTextContainer = styled('div')`
  position: relative;
  color: ${themed('component.label.text.color.base')};

  ${dynamicLabelStyle}
`


const LabelText = styled('div')`
  display: inline-block;
  font-size: ${themed('component.label.font.size')};
  font-weight: ${themed('component.label.font.weight')};
  padding-bottom: ${themed('spacing.xxx_small')};
`


const LabelTag = styled('div')`
  position: absolute;
  right: 0;
  display: inline-block;
  vertical-align: middle;
  text-transform: uppercase;
  font-size: 50%;
  font-weight: 500;
  letter-spacing: 0.085rem;
  line-height: 3;
`


const dynamicSupplementalStyle = props => cx(
  props.isDisabled && disabledState(props),
)


const SupplementalContainer = styled('div')`
  padding-top: ${themed('spacing.xxx_small')};
  font-size: ${themed('component.label.supplemental.font.size')};

  ${dynamicSupplementalStyle}
`


const ErrorContainer = styled('div')`
  color: #FF4C4C;
  padding-top: ${themed('spacing.xxx_small')};
  font-size: ${themed('component.label.supplemental.font.size')};
`


export const Label = compose(
  setDisplayName('Atom.Label'),
  setPropTypes({
    isDisabled: T.bool,
    isError: T.bool,
    isRequired: T.bool,
    isOptional: T.bool,
  }),
  defaultProps({
    isDisabled: false,
    isRequired: false,
    isOptional: false,
  }),
  withProps(
    ({isDisabled, isReadOnly, isError}) => ({
      disabled: isDisabled,
      readOnly: isReadOnly,
    })
  ),
)(({label, supplemental, error, isRequired, isOptional, children, ...props}) => (
  <Container>
    <StyledLabel {...props}>
      <LabelTextContainer {...props}>
        <LabelText>{label}</LabelText>
        {isRequired && <LabelTag>Required</LabelTag>}
        {!isRequired && isOptional && <LabelTag>Optional</LabelTag>}
      </LabelTextContainer>
      {children}
    </StyledLabel>
    {
      !error && supplemental &&
      <SupplementalContainer {...props}>
        <Icon size={enums.Size.X_SMALL} name={enums.Icon.INFO} /> {supplemental}
      </SupplementalContainer>
    }
    {
      error &&
      <ErrorContainer>
        <Icon size={enums.Size.X_SMALL} name={enums.Icon.ALERT_CIRCLE} /> {error}
      </ErrorContainer>
    }
  </Container>
))


export default Label
