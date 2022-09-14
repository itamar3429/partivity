import React from "react";

function includesCaseI(arr: string[], str: string) {
	return arr.some((x) => str.toLowerCase() === x.toLowerCase());
}

function nextWord(string = "", searchArr: string[]) {
	let index;
	let word;
	for (let i = 0; i < searchArr.length; i++) {
		const currWord = searchArr[i];
		const currI = string.toLowerCase().indexOf(currWord.toLowerCase());
		if (currI !== -1) {
			if (index === undefined || currI < index) {
				index = currI;
				word = string.substring(index, currWord.length + index);
			}
		}
	}
	if (word) {
		return {
			index: index as number,
			word,
		};
	}
	return null;
}

function divideWords(searchArr: string[], text: string) {
	let next = nextWord(text, searchArr);
	const results = [];
	while (next) {
		const { index, word } = next;
		results.push(text.substring(0, index));
		results.push(word);
		text = text.substring(index + word.length);
		next = nextWord(text, searchArr);
	}
	results.push(text);
	return results;
}

function HighlightText({
	text,
	textArr,
	highLightStyle,
}: {
	text: string;
	textArr: string[];
	highLightStyle: React.CSSProperties;
}) {
	textArr = textArr.filter((x) => x);
	if (!textArr.join("").trim()) return <>{text}</>;
	let words = divideWords(textArr, text);
	// let words = text.split(" ");
	const res = words.map((word) => {
		if (includesCaseI(textArr, word))
			return (
				<>
					<b style={highLightStyle}>{word}</b>
				</>
			);
		return <>{word}</>;
	});

	return <>{res}</>;
}

export default HighlightText;
