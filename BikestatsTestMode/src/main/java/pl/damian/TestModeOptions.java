package pl.damian;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class TestModeOptions {

	private boolean isLogged = true;
	private boolean showMainPage = false;
	private int mainPageEntries = 3; // up to 6
	private int commentsCount = 6; // up to 6
	private boolean showCategoryHeader = false;
	private boolean showSearchResults = false;
	private boolean searchResultsFail = false;
	
	public static TestModeOptions read() throws FileNotFoundException, IOException {
		TestModeOptions options = new TestModeOptions();
		GenericProperties props = getOrCreateProps();
		options.isLogged = props.getBoolean("isLogged", options.isLogged);
		options.showMainPage = props.getBoolean("showMainPage", options.showMainPage);
		options.commentsCount = props.getInteger("commentsCount", options.commentsCount);
		options.mainPageEntries = props.getInteger("mainPageEntries", options.mainPageEntries);
		options.showCategoryHeader = props.getBoolean("showCategoryHeader", options.showCategoryHeader);
		options.showSearchResults = props.getBoolean("showSearchResults", options.showSearchResults);
		options.searchResultsFail = props.getBoolean("searchResultsFail", options.searchResultsFail);
		return options;
	}
	
	private static GenericProperties getOrCreateProps() throws FileNotFoundException, IOException {
		File file = new File("compiler.properties");
		file.createNewFile();
		GenericProperties props = new GenericProperties();
		props.load(new FileInputStream(file));
		return props;
	}

	public int getMainPageEntries(){
		return searchResultsFail ? 0 : mainPageEntries;
	}
	
	public boolean showMainPage(){
		return showSearchResults || showMainPage;
	}

	public boolean isLogged() {
		return isLogged;
	}

	public void setLogged(boolean isLogged) {
		this.isLogged = isLogged;
	}

	public boolean showCategoryHeader() {
		return showCategoryHeader;
	}

	public void setShowCategoryHeader(boolean showCategoryHeader) {
		this.showCategoryHeader = showCategoryHeader;
	}

	public boolean showSearchResults() {
		return showSearchResults;
	}

	public void setShowSearchResults(boolean showSearchResults) {
		this.showSearchResults = showSearchResults;
	}

	public boolean searchResultsFail() {
		return searchResultsFail;
	}

	public void setSearchResultsFail(boolean searchResultsFail) {
		this.searchResultsFail = searchResultsFail;
	}

	public int getCommentsCount() {
		return commentsCount;
	}

	public void setCommentsCount(int commentsCount) {
		this.commentsCount = commentsCount;
	}

	public void setMainPageEntries(int mainPageEntries) {
		this.mainPageEntries = mainPageEntries;
	}

	public void setShowMainPage(boolean showMainPage) {
		this.showMainPage = showMainPage;
	}
	
	
}
