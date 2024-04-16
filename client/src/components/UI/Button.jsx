import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Button = React.forwardRef(function Button({ className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-6 py-2 text-xs font-bold leading-6 uppercase transition rounded-md focus:outline-none tracking-wide',
        className
      )}
      {...rest}
    />
  );
});

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
