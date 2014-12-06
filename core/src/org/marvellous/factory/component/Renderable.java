package org.marvellous.factory.component;

import org.marvellous.factory.system.RenderSystem.RenderLayout;

import com.badlogic.ashley.core.Component;
import com.badlogic.ashley.core.ComponentMapper;
import com.badlogic.gdx.graphics.g2d.Sprite;
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

    private RenderLayout layout = null;
    private Sprite sprite = null;

    public Sprite getSprite() {
	return sprite;
    }

    public void setSprite(Sprite sprite) {
	this.sprite = sprite;
    }

    public RenderLayout getLayout() {
	return layout;
    }

    public void setLayout(RenderLayout layout) {
	this.layout = layout;
    }

    @Override
    public void reset() {
	layout = null;
	sprite = null;
    }

}
