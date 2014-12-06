package org.marvellous.factory.component;

import org.marvellous.factory.RenderLayout;

import com.badlogic.ashley.core.Component;
import com.badlogic.ashley.core.ComponentMapper;

public class Renderable extends Component {
	public static final ComponentMapper<Renderable> mapper = ComponentMapper
			.getFor(Renderable.class);

	private int x, y;
	private RenderLayout layout;

	public Renderable(RenderLayout layout, int x, int y) {
		super();
		this.x = x;
		this.y = y;
		this.layout = layout;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public RenderLayout getLayout() {
		return layout;
	}

}
