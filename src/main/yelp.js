import axios from "axios";
//var cors = require('cors');
import { setStore } from "../store/RecordsStore";
import { vendorSetStore } from "../store/VendorRecordsStore";

// let API = axios.create({
	const baseURL= "http://172.16.129.244:8080/"
// });

export const getRecords = async (currentPoint) => {
	var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 1000, offset = 0;
	const params = {
		latitude,
		longitude,
		radius
	};
	let res=await axios.get(baseURL+"storagepoint/getall",{ params: params });
	const allRecords = parseDetails(res.data);
	const data = (JSON.stringify({ allRecords, center: res.data.region.center }));
	setStore(JSON.parse(data));	
}  

export const getVendorRecords = async (jwt) => {
	console.log("Debugging: ",jwt);
	//var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 1000, offset = 0;
	const response = await fetch(`http://172.16.129.244:4000/get-vendor-records?authCode=${ jwt }`);
	const data = await response.json();
	console.log(data);
	vendorSetStore(data);
} 

export const getRecord = async recordId => {
	let extendedURL=(`storagepoint/${ recordId }`);
	let res=await axios.get(baseURL+extendedURL);
	return res.data;
}


const parseDetails2 = info => {

	console.log("Parsing details...");
	//console.log(info);
	var records = [];
	var businesses = info;
	//var total = parsedInfo.total;	

	var distance = 0;
	var distanceMiles = 0;

	for (var i = 0; i < businesses.length; i++) {

		var id = businesses[i].storagepoint_id;
		//console.log(id);
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

const parseDetails = info => {

	console.log("Parsing details...");
	//console.log(info);
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

		// if (businesses[i].location) {

		// 	var addressDetails = businesses[i].location;

		// 	if (addressDetails.display_address) {
				
		// 		var displayAddressArr = addressDetails.display_address;

		// 		if (Array.isArray(displayAddressArr)) {
					
		// 			for (var j = 0; j < displayAddressArr.length; j++) {

		// 				var displayAddressPart = displayAddressArr[j];
		// 				displayAddress = displayAddress + displayAddressPart;

		// 				if (j != displayAddressArr.length-1) {

		// 					displayAddress = displayAddress + ", ";
		// 				}
		// 			}
		// 		} else {

		// 			displayAddress = displayAddressArr;
		// 		}
		// 	}
		// }

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