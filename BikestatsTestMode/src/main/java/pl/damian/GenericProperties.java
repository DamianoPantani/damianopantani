package pl.damian;

import java.util.Properties;

public class GenericProperties extends Properties {

	private static final long serialVersionUID = 1L;

	public boolean getBoolean(String key, boolean defaultValue){
		String result = getProperty(key);
		return result == null ? defaultValue : Boolean.parseBoolean(result);
	}
	
	public int getInteger(String key, int defaultValue){
		String result = getProperty(key);
		return result == null ? defaultValue : Integer.parseInt(result);
	}
	
}
