package org.marvellous.factory.component;

import org.marvellous.factory.system.RenderSystem.RenderLayout;

import com.badlogic.ashley.core.Component;
import com.badlogic.ashley.core.ComponentMapper;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.utils.Pool.Poolable;

/**
 * A renderable component, related to RenderSystem, which contains x and y
 * position, a layout, and visual content.
 * 
 * @author NiZiL
 *
 */
public class Renderable extends Component implements Poolable {
	public static final ComponentMapper<Renderable> mapper = ComponentMapper
			.getFor(Renderable.class);

	private int x = 0, y = 0;
	private RenderLayout layout = null;

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

	@Override
	public void reset() {
		x = 0;
		y = 0;
		layout = null;
	}

	public void render(SpriteBatch batch, float deltaTime) {

	};

}
