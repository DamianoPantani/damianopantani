package pl.damian;

public class ReplacementConfig {

	private ArrayReplacement[] arrayReplacements = {};
	private Replacement singleReplacement = new Replacement("", "");

	private String loopTag = "";
	private int loopFactor = 1;

	private String onceAtStart = "";
	private String onceAtEnd = "";
	
	public ArrayReplacement[] getArrayReplacements() {
		return arrayReplacements;
	}
	public ReplacementConfig setArrayReplacements(ArrayReplacement ... arrayReplacements) {
		this.arrayReplacements = arrayReplacements;
		return this;
	}
	public Replacement getSingleReplacement() {
		return singleReplacement;
	}
	public ReplacementConfig setSingleReplacement(Replacement singleReplacement) {
		this.singleReplacement = singleReplacement;
		return this;
	}
	public String getLoopTag() {
		return loopTag;
	}
	public ReplacementConfig setLoopTag(String loopTag) {
		this.loopTag = loopTag;
		return this;
	}
	public int getLoopFactor() {
		return loopFactor;
	}
	public ReplacementConfig setLoopFactor(int loopFactor) {
		this.loopFactor = loopFactor;
		return this;
	}
	public String getOnceAtStart() {
		return onceAtStart;
	}
	public ReplacementConfig setOnceAtStart(String onceAtStart) {
		this.onceAtStart = onceAtStart;
		return this;
	}
	public String getOnceAtEnd() {
		return onceAtEnd;
	}
	public ReplacementConfig setOnceAtEnd(String onceAtEnd) {
		this.onceAtEnd = onceAtEnd;
		return this;
	}

}
