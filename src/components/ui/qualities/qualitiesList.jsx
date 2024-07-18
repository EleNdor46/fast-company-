import React from 'react';

const QualitiesList = ({qualities}) => {
  return <>
  {qualities.map((qual) => {
          let classColor = `m-2 badge bg-${qual.color}`;
          return (
            <span key={qual._id} className={classColor}>
              {qual.name}{" "}
            </span>
          );
        })}
  </>
};

export default QualitiesList;
