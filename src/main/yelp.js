import axios from "axios";
import { setStore } from "../store/RecordsStore";
import { vendorSetStore } from "../store/VendorRecordsStore";

const baseURL= "http://172.16.129.244:8080/"

export const getRecords = async (currentPoint) => {
	var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 1000, offset = 0;
	const params = {
		latitude,
		longitude,
		radius
	};
	let res=await axios.get(baseURL+"storagepoint/getall",{ params: params });
	const allRecords = parseDetails(res.data);
	console.log(allRecords);
	const data = (JSON.stringify({ allRecords, center: res.data.region.center }));
	setStore(JSON.parse(data));	
}  

export const getVendorRecords = async (jwt) => {
	console.log("Debugging: ",jwt);
	let axiosConfig = {
		headers: {
			Authorization: jwt,
			'Content-Type': 'application/json'
		}
	  };
	let res=await axios.get(baseURL+"vendor/getall",axiosConfig);
	let allRecords=parseDetails2(res.data);
	let vendorRecs={allRecords};
	console.log(vendorRecs);
	vendorSetStore(vendorRecs);
} 

export const getRecord = async recordId => {
	let extendedURL=(`storagepoint/${ recordId }`);
	let res=await axios.get(baseURL+extendedURL);
	return res.data;
}


const parseDetails2 = info => {

	console.log("Parsing details...");
	var records = [];
	var businesses = info;
	var distance = 0;
	var distanceMiles = 0;

	for (var i = 0; i < businesses.length; i++) {
		var id = businesses[i].storagepoint_id;
		var imageURL = businesses[i].image_url;
		var name = businesses[i].name;
		var alias = businesses[i].alias;
		var phone = businesses[i].display_phone;
		var price = businesses[i].price;
		var rating = businesses[i].rating;	

		var isClosed = businesses[i].is_closed;
		var isOpen = (isClosed == true) ? false : true;

		var coordinates = businesses[i].coordinates;
		var latitude = coordinates.latitude;
		var longitude = coordinates.longitude;

		var displayAddress = businesses[i].location.display_address;

		if (businesses[i].distance) {

			var distance = businesses[i].distance;
			var distanceMiles = (distance * 0.000621371192).toFixed(2);
		}

		if (isClosed != true) {
			
			records.push({
				
				id,
				alias,
				imageURL,
				name,
				phone,
				price,
				rating, 
				latitude, 
				longitude, 
				displayAddress, 
				isOpen, 
				distance: distanceMiles
			});
		}
	}
	return records;
}

const parseDetails = info => {
	console.log("Parsing details...");
	var records = [];
	var parsedInfo = info;
	var businesses = parsedInfo.list;
	var total = parsedInfo.total;
	var distance = 0;
	var distanceMiles = 0;
	for (var i = 0; i < businesses.length; i++) {

		var id = businesses[i].storagepoint_id;
		//var url = businesses[i].url;
		var imageURL = businesses[i].image_url;
		var name = businesses[i].name;
		var alias = businesses[i].alias;
		var phone = businesses[i].display_phone;
		var price = businesses[i].price;
		var rating = businesses[i].rating;	

		var isClosed = businesses[i].is_closed;
		var isOpen = (isClosed == true) ? false : true;

		var coordinates = businesses[i].coordinates;
		var latitude = coordinates.latitude;
		var longitude = coordinates.longitude;

		var displayAddress = businesses[i].location.display_address;

		if (businesses[i].distance) {

			var distance = businesses[i].distance;
			var distanceMiles = (distance * 0.000621371192).toFixed(2);
		}

		if (isClosed != true) {
			
			records.push({
				id,
				alias,
				imageURL,
				name,
				phone,
				price,
				rating, 
				latitude, 
				longitude, 
				displayAddress, 
				isOpen, 
				distance: distanceMiles
			});
		}
	}

	return records;
}