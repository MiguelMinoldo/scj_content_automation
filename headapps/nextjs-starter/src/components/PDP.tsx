import React from 'react';
import {
  Field,
  Text,
  ImageField,
  NextImage as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
  fields?: Fields;
};

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const Default = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const fields: Fields | undefined = sitecoreContext?.route?.fields as Fields | undefined;

  if (!fields) {
    return <div>Loading...</div>; // Handle loading or error state
  }

  const productTitle = fields.ProductTitle ? (
    <h2>
      <strong>
        <Text field={fields.ProductTitle}></Text>
      </strong>
    </h2>
  ) : null;

  const upc = fields.UPC ? (
    <p>
      <strong>UPC:</strong> <Text field={fields.UPC}></Text>
    </p>
  ) : null;

  const subCategory = fields.SubCategory ? (
    <p>
      <strong>Sub Category:</strong> <Text field={fields.SubCategory}></Text>
    </p>
  ) : null;

  const fragrance = fields.Fragrance ? (
    <p>
      <strong>Fragrance:</strong> <Text field={fields.Fragrance}></Text>
    </p>
  ) : null;

  const productID = fields.ProductID ? (
    <p>
      <strong>Product ID:</strong> <Text field={fields.ProductID}></Text>
    </p>
  ) : null;

  const title = fields.Title ? (
    <p>
      <strong>Title:</strong> <Text field={fields.Title}></Text>
    </p>
  ) : null;

  const productDescription = fields.ProductDescription ? (
    <p>
      <strong>Description:</strong> {stripHtmlTags(fields.ProductDescription.value)}
    </p>
  ) : null;

  const fragranceThemeColor = fields.FragranceThemeColor ? (
    <p>
      <strong>Fragrance Theme Color:</strong> <Text field={fields.FragranceThemeColor}></Text>
    </p>
  ) : null;

  const productImage = fields.ImageUrl ? <JssImage field={fields.ImageUrl} /> : null;

  const addToCartButton = (
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Add to Cart
    </button>
  );

  return (
    <div
      className={`component rich-text`}
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>{productTitle}</h1>
      <div
        className="component-content"
        style={{
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {productImage}
        <div style={{ marginLeft: '20px' }}>
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
