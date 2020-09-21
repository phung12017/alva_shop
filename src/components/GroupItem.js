import React from 'react'
 import styled from 'styled-components'

const ViewStyle = ({ ...props }) => {

    return <View {...props} >{props.children}</View>

}

const View = styled.View`
 
    padding:8px 16px;
    align-items:center;
    justify-content:space-between
 
     ${({ row }) => {
        switch (true) {
            case row:
                return `  flex-direction:row`;
            default:
                return `  flex-direction:column`
        }
    }}
`
export default ViewStyle