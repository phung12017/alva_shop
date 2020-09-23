import React from 'react'
import styled from 'styled-components'

const TextStyle = ({ ...props }) => {

    return <Text {...props} >{props.children}</Text>

}

const Text = styled.Text`    

    color:${props => props.color ?? "#000"}
 
    ${({ title, large, medium, small, subTitle }) => {
        switch (true) {
            case title:
                return `font-size: 32px`;
            case subTitle:
                return `font-size: 24px`;
            case large:
                return `font-size: 20px`;

            case medium:
                return `font-size: 16px`;
            case small:
                return `font-size: 13px`;
            default:
                return `font-size: 14px`
        }

    }}

    ${({ light, bold, semi, italic }) => {
        switch (true) {
            case light:
                return `font-family: ProductSans-Light`;
            case bold:
                return `font-family: ProductSans-Bold`;

            case semi:
                return `font-family: ProductSans-Medium`;
            case italic:
                return `font-family: ProductSans-Italic`;
            default:
                return `font-family: ProductSans-Regular`;
        }

    }}

    

`
export default TextStyle