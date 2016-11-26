function test1(){
	var G = new jsnx.Graph();
	G.addNodesFrom([1,2,3, "foo"]);
	console.log(G.nodes());
	// [1, 2, 3, "foo"]
}
