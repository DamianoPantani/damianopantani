package pl.damian;

public class ArrayReplacement {
	
	private String source;
	private String[] destinations;
	
	public ArrayReplacement(String source, String ... destinations){
		this.source = source;
		this.destinations = destinations;
	}
	
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String[] getDestinations() {
		return destinations;
	}
	public void setDestinations(String ... destinations) {
		this.destinations = destinations;
	}
	
}
