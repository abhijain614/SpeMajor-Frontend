import { Store } from 'pullstate';

const VendorRecordsStore = new Store({
	records: []
});


export default VendorRecordsStore;


export const vendorSetStore = records => {
	VendorRecordsStore.update(state => { state.records = records.allRecords });
}