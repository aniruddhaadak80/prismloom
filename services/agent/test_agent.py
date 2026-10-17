"""Tests for the PRISMLOOM Python agent service."""

from agent import suggest, classify, scene_list


def test_classify_webgl():
    assert classify("a glowing 3d galaxy with particles") == "webgl"


def test_classify_motion():
    assert classify("animate a card with framer motion") == "motion"


def test_classify_audio():
    assert classify("a bass oscillator audio track") == "audio"


def test_classify_shader():
    assert classify("write a glsl fragment shader") == "shader"


def test_classify_4d():
    assert classify("a 4d tesseract rotation") == "4d"


def test_classify_default():
    assert classify("hello world") == "motion"


def test_suggest_shape():
    s = suggest("3d cube scene")
    assert isinstance(s.scene, str)
    assert 0.0 <= s.confidence <= 1.0
    assert isinstance(s.reason, str)


def test_scene_list_nonempty():
    assert "webgl" in scene_list()
    assert len(scene_list()) >= 5
