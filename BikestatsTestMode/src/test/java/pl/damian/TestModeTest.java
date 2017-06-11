package pl.damian;

import org.assertj.core.api.Assertions;
import org.testng.annotations.Test;

public class TestModeTest {

	@Test
	public void shouldReplaceText(){
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.replaceText("Damian Mistrz świata w programowaniu programów", "program", "got");
		
		//then
		Assertions.assertThat(result).isEqualTo("Damian Mistrz świata w gotowaniu gotów");
	}
	
	@Test
	public void shouldReplaceText2(){
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.replaceText("Damian Mistrz świata w programowaniu programów", new Replacement("program", "got"));
		
		//then
		Assertions.assertThat(result).isEqualTo("Damian Mistrz świata w gotowaniu gotów");
	}

	@Test
	public void shouldReplaceTextWithArray(){
		
		//given
		TestMode instance = new TestMode();
		ArrayReplacement arrayReplacement = new ArrayReplacement("test", "a", "b", "c");
		
		//when
		String result = instance.replaceTextWithArray("this test is test and testing properly", arrayReplacement);
		
		//then
		Assertions.assertThat(result).isEqualTo("this a is b and cing properly");
	}	
	
	@Test
	public void shouldGetTextBetweenTag(){
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.textBetweenTag("<damian>", "This is text <damian>this is result</damian> hehehe");
		
		//then
		Assertions.assertThat(result).isEqualTo("this is result");
		
	}

	@Test
	public void shouldMultiply(){
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.multiply("damian", 4);
		
		//then
		Assertions.assertThat(result).isEqualTo("damiandamiandamiandamian");
	}

	@Test
	public void shouldRemoveTag(){
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.removeTag("This is text <damian>this is result</damian> hehehe", "damian");
		
		//then
		Assertions.assertThat(result).isEqualTo("This is text this is result hehehe");
	}
	
	@Test
	public void shouldReplaceLoop(){
		
		//given
		TestMode instance = new TestMode();
		
		//when
		String result = instance.replaceLoop("This <test>is <so> damn <awesome></test> !! hehe", new ReplacementConfig()
				.setLoopTag("<test>")
				.setLoopFactor(3)
				.setOnceAtStart("DAMIAN ")
				.setOnceAtEnd(" SUPER")
				.setSingleReplacement(new Replacement(
						"<awesome>",
						"so <cool>!"
				))
				.setArrayReplacements(
					new ArrayReplacement(
						"<cool>",
						"fantastic ", "noice ", "incredible "
					),
					new ArrayReplacement(
						"<so>",
						"very", "pretty much", "kind of"
					)
				)
			);
		
		//then
		Assertions.assertThat(result).isEqualTo("This DAMIAN is very damn so fantastic !is pretty much damn so noice !is kind of damn so incredible ! SUPER !! hehe");
	}


}
