const CSVEx1v = [
  ["1", "2", "3", "4", "5"],
  ["I", "want", "it", "that", "way"],
];
const TestFile = [["You", "are", "my", "fire"]];

const search1 = [["I", "want", "it", "that", "way"]];
// const LoadResponse = [["Output:", "loaded", "succesfully"]];
export let data = new Map<string, string[][]>();

data.set("way", CSVEx1v);
data.set("fire", TestFile);
data.set("want", search1);



export let searchdata = new Map<[string, string], string[][]>();
searchdata.set(["1", "want"], search1);
