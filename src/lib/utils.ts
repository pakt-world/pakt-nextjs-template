/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUtc from "dayjs/plugin/utc";
import { isNull, isUndefined } from "lodash";
import CryptoJS from "crypto-js";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import ENVS from "@/core/config";

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export const isProductionEnvironment = ENVS.isProduction;


export const createQueryString = (name: string, value: string): string => {
	const params = new URLSearchParams();
	params.set(name, value);
	return params.toString();
};

type CreateQueryStringsParams = Array<{ name: string; value: string }>;

export const createQueryStrings = (opts: CreateQueryStringsParams): string => {
	const params = new URLSearchParams();
	opts.forEach((opt) => {
		params.set(opt.name, opt.value);
	});
	return params.toString();
};

type CreateQueryStringsOpts = Record<string, string>;

export const createQueryStrings2 = (opts: CreateQueryStringsOpts): string => {
	const params = new URLSearchParams();
	Object.keys(opts).forEach((key) => {
		const value = opts[key];
		if (value !== undefined) {
			params.set(key, value);
		}
	});
	return params.toString();
};

export const spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export const formatCountdown = (counter: number): string => {
	const minutes = Math.floor(counter / 60);
	const seconds = counter % 60;

	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export function formatBytes(bytes: number, decimals = 2): string {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"Bytes",
		"KiB",
		"MiB",
		"GiB",
		"TiB",
		"PiB",
		"EiB",
		"ZiB",
		"YiB",
	];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export const CopyText = async (text: string): Promise<void> =>
	navigator.clipboard.writeText(text);

export function sentenceCase(str: string): string {
	if (!str || typeof str !== "string") {
		return ""; // Handle empty or invalid input
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatUsd(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}
export function formatUsdToSixDecimals(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 6,
		maximumFractionDigits: 6,
	}).format(value);
}

export const truncate = (str: string, n: number): string => {
	return str.length > n ? `${str.slice(0, n - 1)}...` : str;
};

export const lowerCase = (str: string): string => {
	return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str: string = ""): string => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export function getAvatarColor(paktScore: number): string {
	if (paktScore <= 20) {
		return "#DC3545";
	}
	if (paktScore <= 40) {
		return "#F9D489";
	}
	if (paktScore <= 60) {
		return "#F2C94C";
	}
	if (paktScore <= 80) {
		return "#9BDCFD";
	}
	return "#28A745";
}

export const limitString = (str: string, limit: number = 10): string =>
	str.length > limit ? `${str.slice(0, limit)}...` : str;


const allowedFileTypes = [
	"pdf",
	"doc",
	"ai",
	"avi",
	"docx",
	"csv",
	"ppt",
	"zip",
	"rar",
	"jpeg",
	"png",
	"jpg",
];

interface PreviewResult {
	preview: string;
	type: string;
}

export function getPreviewByType(file: File): PreviewResult {
	const { type } = file;
	let preview;
	if (type.includes("image/")) {
		preview = URL.createObjectURL(file);
	} else {
		const typP = type.split("/")[1];
		if (typP && allowedFileTypes.includes(typP))
			preview = `/images/thumbnail/${typP.toUpperCase()}.png`;
		else preview = "/images/thumbnail/TXT.png";
	}
	return { preview, type };
}

export function getPreviewByTypeUrl(url: string, type: string): PreviewResult {
	let preview;
	if (type.includes("image/") || type === "image") {
		preview = url;
	} else {
		const typP = type.split("/")[1];
		if (typP && allowedFileTypes.includes(typP))
			preview = `/images/thumbnail/${typP.toUpperCase()}.png`;
		else preview = "/images/thumbnail/TXT.png";
	}
	return { preview, type };
}

export const paginate = <T>(
	array: T[],
	itemsPerPage: number,
	currentPage: number
): T[] => {
	return array.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
};

export function filterEmptyStrings(arr: string[]): string[] {
	return arr.filter((value) => {
		return value !== "";
	});
}

export function formatTimestampForDisplay(
	utcTimestamp: string | number | Date
): string {
	const localTimestamp = new Date(utcTimestamp);
	// Only show the time
	return localTimestamp.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

// Empty functions for empty onClick handlers instead of using unnecessary `Logger.info()`
export const emptyFunction = (): void => {
	// Modifying a data structure
	const arr = [];
	arr.push(5);
};


export const disallowedChars = [
	"<",
	">",
	"{",
	"}",
	"(",
	")",
	"=",
	"-",
	"~",
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"_",
	"+",
	"|",
	":",
	";",
	"'",
	",",
	"?",
	"/",
	"`",
	'"',
	".",
	" ",
];

export const getPreviousLinkLabel = (
	previousLink: string
): {
	label: string;
	link: any;
} => {
	const url = new URL(previousLink, window.location.origin);
	const pathSegments = url.pathname.split("/").filter(Boolean);

	// A mapping for dynamic route patterns and their labels
	const routePatterns: Array<{ pattern: RegExp; label: string }> = [
		{ pattern: /^\/pakts$/, label: "Pakts" },
		{ pattern: /^\/pakt0-9]{24}$/, label: "Pakt Details" },
		{ pattern: /^\/pakts\/[a-f0-9]{24}\/edit$/, label: "Edit Pakt" },
		{
			pattern: /^\/pakts\/[a-f0-9]{24}\/make-deposit$/,
			label: "Make Payment",
		},
		// Add more route patterns and labels here
		{ pattern: /^\/talents$/, label: "Talents" },
		{ pattern: /^\/talents\/[a-f0-9]{24}$/, label: "Talent Details" },
	];
	// Check if the path matches any of the defined route patterns
	const matchedRoute = routePatterns.find((route) =>
		route.pattern.test(url.pathname)
	);

	let label = matchedRoute ? matchedRoute.label : "Unknown";

	// If no match is found in the patterns, create a dynamic label based on the path segments
	if (label === "Unknown" && pathSegments.length > 0) {
		if (pathSegments.length === 1) {
			label = pathSegments[0]
				? pathSegments[0].charAt(0).toUpperCase() +
					pathSegments[0].slice(1)
				: "Unknown";
		} else if (pathSegments.length > 1) {
			label = pathSegments
				.map((segment) =>
					segment
						? segment.charAt(0).toUpperCase() + segment.slice(1)
						: ""
				)
				.filter(Boolean)
				.join(" / ");
		}
	}

	return { label, link: previousLink };
};

export const TIMEZONE_KEY = "P4K7FUND_u53r_71m3z0n3";

export const formatDateHandler = (date?: string, format?: string): string => {
	// Get timezone from localStorage, then format with dayjs
	const timezone = localStorage.getItem(TIMEZONE_KEY) || dayjs.tz.guess();
	const defaultFormat = "MMM DD, YYYY hh:mm A";

	const d = date
		? timezone !== undefined && timezone !== "undefined"
			? dayjs(date)
					.tz(timezone)
					.format(format || defaultFormat)
			: dayjs(date).format(format || defaultFormat)
		: dayjs().format(defaultFormat);

	return d as string;
};

const getUserTimezone = (): string => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const userTimezone = getUserTimezone() || "UTC";

export function getRequestSignature(url: string): {
	signature: string;
	timeStamp: string;
} {
	const timestamp = Date.now();
	const key = String(process.env.NEXT_PUBLIC_API_KEY);
	const clientId = String(process.env.NEXT_PUBLIC_API_ID);

	const payload = {
		url,
		"time-stamp": String(timestamp),
		"client-id": clientId,
	};
	const dataStr = JSON.stringify(payload);
	const hash = CryptoJS.HmacSHA256(dataStr, String(key));
	const signature = hash.toString();

	return { signature, timeStamp: String(timestamp) };
}

export const generateUniqueId = (): string => {
	return `_${Math.random().toString(36).substr(2, 9)}`;
};

export function getPreviewByType2(type: string): PreviewResult {
	let preview;
	const typP = type.split("/")[1];
	if (typP && allowedFileTypes.includes(typP))
		preview = `/images/thumbnail/${typP.toUpperCase()}.png`;
	else preview = "/images/thumbnail/TXT.png";

	return { preview, type };
}

export function formatNumberWithCommas(
	number?: string | number | undefined,
	decimal?: number
): string {
	if (number === undefined || number === null) return "";
	// Convert the input to a number if it's a string
	const num = typeof number === "string" ? parseFloat(number) : number;

	// If num is not a valid number, return an empty string or handle it accordingly
	// eslint-disable-next-line no-restricted-globals
	if (isNaN(num)) {
		return "";
	}

	// Split the number into integer and decimal parts
	const [integerPart = "0", decimalPart = ""] = num
		.toFixed(decimal || 2)
		.split(".");

	// Format the integer part with commas
	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		","
	);

	// Ensure the decimal part has the correct number of digits
	const formattedDecimalPart = decimalPart.padEnd(decimal || 2, "0");

	// Recombine the integer and decimal parts
	const formattedNumber = `${formattedIntegerPart}.${formattedDecimalPart}`;

	return formattedNumber;
}

export function formatNumber(number: number): string {
	if (number >= 1e12) {
		return `${(number / 1e12).toFixed(2)}t`;
	}
	if (number >= 1e9) {
		return `${(number / 1e9).toFixed(2)}b`;
	}
	if (number >= 1e6) {
		return `${(number / 1e6).toFixed(2)}m`;
	}
	if (number >= 1e3) {
		return `${(number / 1e3).toFixed(2)}k`;
	}
	return Number(number).toFixed(2).toString();
}

export function isValidInteger(value: string): boolean {
	// Check if value is a non-positive integer (0 or negative)
	const intValue = parseInt(value, 10);
	return Number.isInteger(intValue) && intValue <= 0;
}

export function sentenceCase2(str: string): string {
	return str
		.split(" ")
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(" ");
}

export const removeDuplicatesFromArray = <T = any>(
	arr: any[],
	index?: string
): T[] => {
	if (!index) return [...new Set(arr)];
	return [...new Map(arr.map((item) => [item?.[index], item])).values()];
};

interface RejectSpecialCharactersOptions {
	allowApostrophes?: boolean;
}

/**
 * Checks the input string and rejects special characters.
 * Allows only alphanumeric characters, spaces, and some basic punctuation.
 *
 * @param {string} input - The input string to validate.
 * @return {boolean} - Returns true if the input contains only allowed characters, false otherwise.
 */
export const rejectSpecialCharacters = (
	input: string,
	options: RejectSpecialCharactersOptions = {}
): boolean => {
	const { allowApostrophes = false } = options;
	const pattern = allowApostrophes
		? /^[a-zA-Z0-9 ,.'-]+$/
		: /^[a-zA-Z0-9 ,.-]+$/;
	return pattern.test(input);
};

export const sortArrayLatestFirstByDate = <
	T extends { createdAt: Date | string; updatedAt?: Date | string },
>(
	data: T[]
): T[] => {
	// Sort the data by the latest date first
	const sorted = data.sort(
		(a, b) =>
			new Date(b.createdAt ?? b.updatedAt).getTime() -
			new Date(a.createdAt ?? a.updatedAt).getTime()
	);
	// Remove duplicates
	return removeDuplicatesFromArray(sorted, "updatedAt");
};

export const sortArrayLatestFirstByDateOnly = <
	T extends { createdAt: Date | string; updatedAt?: Date | string },
>(
	data: T[]
): T[] => {
	// Sort the data by the latest date first
	const sorted = data.sort(
		(a, b) =>
			new Date(b.createdAt ?? b.updatedAt).getTime() -
			new Date(a.createdAt ?? a.updatedAt).getTime()
	);
	// Remove duplicates
	return removeDuplicatesFromArray(sorted, "_id");
};

export const truncateText = (
	text: string,
	limit: number,
	expanded: boolean
): string => {
	if (expanded || text.length <= limit) {
		return text;
	}
	return `${text.slice(0, limit)}...`;
};

// Utility function to convert hex to rgba
export const hexToRgba = (hex: string, opacity: number): string => {
	// Remove the '#' if present
	const sanitizedHex = hex.replace("#", "");

	// Convert 3-digit hex to 6-digit hex
	const fullHex =
		sanitizedHex.length === 3
			? sanitizedHex
					.split("")
					.map((c) => `${c}${c}`)
					.join("")
			: sanitizedHex;

	// Convert the hex string to RGB values
	const r = parseInt(fullHex.substring(0, 2), 16);
	const g = parseInt(fullHex.substring(2, 4), 16);
	const b = parseInt(fullHex.substring(4, 6), 16);

	// Return rgba string
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Utility function to convert hex to 8-digit hex with opacity
export const hexWithOpacity = (hex: string, opacity: number): string => {
	// Remove the '#' if present
	const sanitizedHex = hex.replace("#", "");

	// Convert opacity from 0-1 to 0-255
	const alpha = Math.round(opacity * 255)
		.toString(16)
		.padStart(2, "0");

	// Return the hex color with alpha appended
	return `#${sanitizedHex}${alpha}`;
};

export const roundDown = (num: number | string, digit?: number) => {
	const str = String(num);
	const digitI = digit || 2;

	const splits = str.split(".");
	if (splits.length > 0) {
		const factor = Math.pow(10, digitI);
		return Math.floor(Number(num) * factor) / factor;
	}
	return Number(Number(num).toFixed(digitI));
};

export const JOB_DIGIT = 6;

export const getBoolean = (value: any) => {
	switch (value) {
		case true:
		case "true":
		case 1:
		case "ON":
		case "on":
		case "yes":
		case "YES":
			return true;
		default:
			return false;
	}
};

export const getLocalDate = (utcDate: Date) => {
	return new Date(
		utcDate.getUTCFullYear(),
		utcDate.getUTCMonth(),
		utcDate.getUTCDate()
	);
};

export const sleep = (milliseconds: number) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};

export const setTimeZone = (storedTimeZone?: string) => {
	const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const timezone =
		isNull(storedTimeZone) ||
		isUndefined(storedTimeZone) ||
		storedTimeZone == "undefined"
			? browserTimeZone
			: storedTimeZone;
	localStorage.setItem(TIMEZONE_KEY, timezone);
	return;
};

export const getTimeZone = () => {
	const storedTimeZone = localStorage.getItem(TIMEZONE_KEY);
	const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const timezone =
		isNull(storedTimeZone) ||
		isUndefined(storedTimeZone) ||
		storedTimeZone == "undefined"
			? browserTimeZone
			: storedTimeZone;
	return timezone;
};
