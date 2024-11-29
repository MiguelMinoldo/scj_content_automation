import React from 'react';
import { Field, Text, RichText as JssRichText, ImageField, NextImage as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
  ProductTitle: Field<string>;
  UPC: Field<string>;
  SubCategory: Field<string>;
  Fragrance: Field<string>;
  ProductID: Field<string>;
  Title: Field<string>;
  ProductDescription: Field<string>;
  FragranceThemeColor: Field<string>;
  ImageUrl: ImageField;
  Price: Field<string>;
}

export type PDPProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export const Default = (props: PDPProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  const productTitle = props.fields.ProductTitle ? (
    <h2><strong><Text field={props.fields.ProductTitle}></Text></strong></h2>
  ) : null;

  const upc = props.fields.UPC ? (
    <p><strong>UPC:</strong> <Text field={props.fields.UPC}></Text></p>
  ) : null;

  const subCategory = props.fields.SubCategory ? (
    <p><strong>Sub Category:</strong> <Text field={props.fields.SubCategory}></Text></p>
  ) : null;

  const fragrance = props.fields.Fragrance ? (
    <p><strong>Fragrance:</strong> <Text field={props.fields.Fragrance}></Text></p>
  ) : null;

  const productID = props.fields.ProductID ? (
    <p><strong>Product ID:</strong> <Text field={props.fields.ProductID}></Text></p>
  ) : null;

  const title = props.fields.Title ? (
    <p><strong>Title:</strong> <Text field={props.fields.Title}></Text></p>
  ) : null;

  const productDescription = props.fields.ProductDescription ? (
    <p><strong>Description:</strong> {stripHtmlTags(props.fields.ProductDescription.value)}</p>
  ) : null;

  const fragranceThemeColor = props.fields.FragranceThemeColor ? (
    <p><strong>Fragrance Theme Color:</strong> <Text field={props.fields.FragranceThemeColor}></Text></p>
  ) : null;

  const productImage = props.fields.ImageUrl ? (
    <JssImage field={props.fields.ImageUrl} />
  ) : null;

  const price = props.fields.Price ? (
    <p style={{ fontSize: '1.5rem', color: '#e67e22' }}>Price: <strong>{props.fields.Price.value}</strong></p>
  ) : null;

  const addToCartButton = (
    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      Add to Cart
    </button>
  );

  return (
    <div className={`component rich-text`} style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>{productTitle}</h1>
      <div className="component-content" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start' }}>
        {productImage}
        <div style={{ marginLeft: '20px' }}>
          {price}
          {text}
          {upc}
          {subCategory}
          {fragrance}
          {productID}
          {title}
          {productDescription}
          {fragranceThemeColor}
          {addToCartButton}
        </div>
      </div>
    </div>
  );
};
