import { CloseOutlined } from '@ant-design/icons';
import { BasketItemControl } from 'components/basket';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { removeFromBasket } from 'redux/actions/basketActions';

const BasketItem = ({ dispatch, product }) => {
	const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

	return (
		<div className="basket-item">
			<BasketItemControl product={product} />
			<div className="basket-item-wrapper">
				<div className="basket-item-img-wrapper">
					<ImageLoader
						className="basket-item-img"
						src={product.image}
					/>
				</div>
				<div className="basket-item-details">
					<Link to={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
						<h4 className="underline basket-item-name">
							{product.name}
						</h4>
					</Link>
					<div className="basket-item-specs">
						<div>
							<span className="spec-title">Quantity</span>
							<h5 className="my-0">{product.quantity}</h5>
						</div>
						<div>
							<span className="spec-title">Size</span>
							<h5 className="my-0">{product.selectedSize} mm</h5>
						</div>
						<div>
							<span className="spec-title">Color</span>
							<div style={{
								backgroundColor: product.selectedColor || product.availableColors[0],
								width: '15px',
								height: '15px',
								borderRadius: '50%'
							}}
							/>
						</div>
					</div>
				</div>
				<div className="basket-item-price">
					<h4 className="my-0">{displayMoney(product.price * product.quantity)}</h4>
				</div>
				<button
					className="basket-item-remove button button-border button-border-gray button-small"
					onClick={onRemoveFromBasket}
				>
					<CloseOutlined />
				</button>
			</div>
		</div>
	);
};

BasketItem.propType = {
	product: PropTypes.object.isRequired,
	basket: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BasketItem;
