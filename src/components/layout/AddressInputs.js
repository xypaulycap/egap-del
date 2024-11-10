export default function AddressInputs({addressProps, setAddressProps, disabled = false}){
  const {
    phone, streetAddress,
    postalCode, city, country
  } = addressProps
    return(
        <>
        <label>Phone number</label>
        <input
        disabled = {disabled}
          type="tel"
          placeholder="Phone Number"
          value={phone || ''}
          onChange={(ev) => setAddressProps('phone',ev.target.value)}
        />
        <label>Street address</label>
        <input
        disabled = {disabled}
          type="text"
          placeholder="Street Address"
          value={streetAddress || ''}
          onChange={(ev) => setAddressProps('streetAddress',ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Postal code</label>
            <input
            disabled={disabled}
              type="text"
              placeholder="Postal Code"
              value={postalCode || ''}
              onChange={(ev) => setAddressProps('postalCode',ev.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
            disabled = {disabled}
              type="text"
              placeholder="City"
              value={city || ''}
              onChange={(ev) => setAddressProps('city',ev.target.value)}
            />
          </div>
        </div>
        <label>Country</label>
        <input
        disabled = {disabled}
          type="text"
          placeholder="Country"
          value={country || ''}
          onChange={(ev) => setAddressProps('country',ev.target.value)}
        />
        </>
    )
}