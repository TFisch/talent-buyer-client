import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import './ViewOfferModal.css';

export class ViewOfferModal extends Component {
  state = {
    offer: {}
  };

  componentDidMount() {
    const { offerId, offers } = this.props;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    const offer = offers.find(offer => offer.id === offerId);
    this.setState({ offer });
  }

  render() {
    const { closeViewOfferModal, currentVenue, currentUser } = this.props;
    const { offer } = this.state;

    let displayOfferInfo;

    if (!Object.keys(offer).length) {
      displayOfferInfo = <p>Loading...</p>;
    } else {
      displayOfferInfo = (
        <div className="offer-info">
          <div className="view-offer-top">
            <section className="basic-details">
              <h3>Offer</h3>
              <p>
                <span className="field">Date:</span> {offer.date}
              </p>
              <p>
                <span className="field">spanArtist:</span> {offer.artist_name}
              </p>
              <p>
                <span className="field">Buyer:</span> {currentUser.first_name}{' '}
                {currentUser.last_name}
              </p>
              <p>
                <span className="field">Buyer Email:</span> {currentUser.email}
              </p>
            </section>
            <section className="view-venue-info">
              <h3>Venue Info</h3>
              <p>
                <span className="field">Venue:</span> {currentVenue.name}
              </p>
              <p>
                <span className="field">Address:</span>{' '}
                {currentVenue.street_address}
              </p>
              <p>
                <span className="field">City:</span> {currentVenue.city},{' '}
                {currentVenue.state}
              </p>
              <p>
                <span className="field">Capacity:</span> {currentVenue.capacity}
              </p>
            </section>
          </div>
          <div className="view-offer-bottom">
            <section className="terms">
              <h3>Terms</h3>
              <p>
                <span className="field">Bonuses:</span> {offer.bonuses}
              </p>
              <p>
                <span className="field">Radius Clause:</span>
                {offer.radius_clause}
              </p>
              <p>
                <span className="field">Door Times:</span> {offer.door_times}
              </p>
              <p>
                <span className="field">Ages:</span> {offer.age_range}
              </p>
              <p>
                <span className="field">Merch Split:</span> {offer.merch_split}
              </p>
            </section>
            <div className="financials">
              <h3>Financials</h3>
              <p>
                <span className="field">Guarentee:</span> ${offer.guarantee}
              </p>
              <p>
                <span className="field">Total Expenses:</span> $
                {offer.total_expenses}
              </p>
              <p>
                <span className="field">Gross Potential:</span> $
                {offer.gross_potential}
              </p>
            </div>
          </div>
          <p onClick={closeViewOfferModal}>x Close</p>
        </div>
      );
    }

    return (
      <div className="view-offer-modal">
        <div className="inner-modal">
          <h1>{currentVenue.name}</h1>
          {displayOfferInfo}
          <p onClick={closeViewOfferModal}>x Cancel</p>
        </div>
      </div>
    );
  }
}

ViewOfferModal.propTypes = {
  closeViewOfferModal: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
  currentVenue: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentVenue: state.currentVenue,
  offers: state.offers
});

export default connect(mapStateToProps)(ViewOfferModal);
