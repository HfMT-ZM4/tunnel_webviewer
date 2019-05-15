{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 6,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 194.0, 79.0, 1152.0, 937.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-85",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "FullPacket" ],
					"patching_rect" : [ 138.5, 1329.5, 69.0, 22.0 ],
					"text" : "o.route /out"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-83",
					"linecount" : 9,
					"maxclass" : "o.compose",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 245.5, 1055.5, 186.0, 133.0 ],
					"presentation_linecount" : 9,
					"saved_bundle_data" : [ 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -80, 47, 116, 101, 109, 112, 108, 97, 116, 101, 0, 0, 0, 44, 46, 0, 0, 0, 0, 0, -100, 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 47, 107, 101, 121, 0, 0, 0, 0, 44, 115, 0, 0, 115, 111, 117, 110, 100, 0, 0, 0, 0, 0, 0, 112, 47, 118, 97, 108, 0, 0, 0, 0, 44, 46, 0, 0, 0, 0, 0, 96, 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 47, 105, 100, 0, 44, 115, 0, 0, 116, 104, 101, 95, 109, 112, 51, 0, 0, 0, 0, 56, 47, 99, 97, 108, 108, 0, 0, 0, 44, 46, 0, 0, 0, 0, 0, 40, 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 47, 109, 101, 116, 104, 111, 100, 0, 44, 115, 0, 0, 114, 101, 115, 116, 97, 114, 116, 0 ],
					"saved_bundle_length" : 196,
					"text" : "/template : {\n\t/key : \"sound\",\n\t/val : {\n\t\t/id : \"the_mp3\",\n\t\t/call : {\n\t\t\t/method : \"restart\"\n\t\t}\n\t}\n}"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "FullPacket" ],
					"patching_rect" : [ 138.5, 1203.0, 48.0, 22.0 ],
					"text" : "o.union"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-80",
					"linecount" : 5,
					"maxclass" : "o.expr.codebox",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "FullPacket", "FullPacket" ],
					"patching_rect" : [ 138.5, 1234.0, 234.0, 86.0 ],
					"text" : "map(\n  lambda(a,\n    assign(\"/out\"+a, /template)\n  ), /trigger\n)"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 158.0, 400.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 138.5, 914.5, 68.0, 22.0 ],
					"text" : "del 101500"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 138.5, 481.5, 61.0, 22.0 ],
					"text" : "del 97500"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-75",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 615.0, 785.0, 35.0, 22.0 ],
					"text" : "clear"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-72",
					"linecount" : 26,
					"maxclass" : "o.compose",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 138.5, 514.5, 273.0, 364.0 ],
					"saved_bundle_data" : [ 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -12, 47, 97, 100, 100, 114, 0, 0, 0, 44, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 0, 0, 0, 47, 49, 52, 52, 0, 0, 0, 0, 47, 49, 52, 50, 0, 0, 0, 0, 47, 49, 52, 49, 0, 0, 0, 0, 47, 49, 52, 51, 0, 0, 0, 0, 47, 49, 51, 57, 0, 0, 0, 0, 47, 49, 52, 48, 0, 0, 0, 0, 47, 49, 51, 51, 0, 0, 0, 0, 47, 49, 51, 50, 0, 0, 0, 0, 47, 49, 51, 49, 0, 0, 0, 0, 47, 49, 51, 52, 0, 0, 0, 0, 47, 49, 51, 53, 0, 0, 0, 0, 47, 49, 51, 48, 0, 0, 0, 0, 47, 49, 50, 52, 0, 0, 0, 0, 47, 49, 50, 56, 0, 0, 0, 0, 47, 49, 50, 57, 0, 0, 0, 0, 47, 49, 50, 54, 0, 0, 0, 0, 47, 49, 50, 55, 0, 0, 0, 0, 47, 49, 50, 51, 0, 0, 0, 0, 47, 49, 50, 53, 0, 0, 0, 0, 47, 49, 50, 49, 0, 0, 0, 0, 47, 49, 50, 50, 0, 0, 0, 0, 47, 49, 49, 55, 0, 0, 0, 0, 47, 49, 49, 52, 0, 0, 0, 0, 47, 49, 49, 51, 0, 0, 0, 0, 47, 49, 49, 53, 0, 0, 0, 0, 47, 49, 49, 54, 0, 0, 0, 0, 47, 49, 49, 50, 0, 0, 0, 0, 47, 49, 48, 56, 0, 0, 0, 0, 47, 49, 48, 57, 0, 0, 0, 0, 47, 49, 49, 48, 0, 0, 0, 0, 47, 49, 49, 49, 0, 0, 0, 0, 47, 49, 48, 54, 0, 0, 0, 0, 47, 49, 48, 55, 0, 0, 0, 0, 47, 49, 48, 51, 0, 0, 0, 0, 47, 49, 48, 52, 0, 0, 0, 0, 47, 49, 48, 53, 0, 0, 0, 0, 47, 57, 55, 0, 47, 57, 56, 0, 47, 57, 57, 0, 47, 57, 54, 0, 47, 57, 53, 0, 47, 57, 51, 0, 47, 57, 52, 0, 47, 57, 49, 0, 47, 57, 50, 0, 47, 56, 57, 0, 47, 57, 48, 0, 47, 56, 54, 0, 47, 56, 55, 0, 47, 56, 56, 0, 47, 56, 53, 0, 47, 56, 48, 0, 47, 56, 49, 0, 47, 55, 57, 0, 47, 55, 55, 0, 47, 55, 56, 0, 47, 55, 51, 0, 47, 55, 49, 0, 47, 55, 50, 0, 47, 55, 52, 0, 47, 55, 53, 0, 47, 55, 54, 0, 47, 54, 57, 0, 47, 55, 48, 0, 47, 54, 55, 0, 47, 54, 56, 0, 47, 54, 53, 0, 47, 54, 54, 0, 47, 54, 52, 0, 47, 54, 48, 0, 47, 53, 57, 0, 47, 53, 54, 0, 47, 53, 52, 0, 47, 53, 53, 0, 47, 53, 55, 0, 47, 53, 56, 0, 47, 53, 48, 0, 47, 52, 57, 0, 47, 52, 56, 0, 47, 52, 55, 0, 47, 53, 49, 0, 47, 53, 50, 0, 47, 53, 51, 0, 47, 52, 54, 0, 47, 52, 48, 0, 47, 52, 49, 0, 47, 52, 50, 0, 47, 51, 56, 0, 47, 51, 57, 0, 47, 51, 55, 0, 47, 51, 54, 0, 47, 51, 51, 0, 47, 51, 52, 0, 47, 51, 53, 0, 47, 51, 50, 0, 47, 51, 49, 0, 47, 51, 48, 0, 47, 50, 57, 0, 47, 50, 56, 0, 47, 50, 50, 0, 47, 50, 51, 0, 47, 50, 52, 0, 47, 50, 49, 0, 47, 49, 57, 0, 47, 50, 48, 0, 47, 49, 56, 0, 47, 49, 54, 0, 47, 49, 55, 0, 47, 49, 53, 0, 47, 49, 52, 0, 47, 49, 51, 0, 47, 49, 50, 0, 47, 49, 49, 0, 47, 49, 48, 0, 47, 52, 0, 0, 47, 53, 0, 0, 47, 54, 0, 0, 47, 51, 0, 0, 47, 50, 0, 0, 47, 49, 0, 0 ],
					"saved_bundle_length" : 776,
					"text" : "/addr : [\"/144\", \"/142\", \"/141\", \"/143\", \"/139\", \"/140\", \"/133\", \"/132\", \"/131\", \"/134\", \"/135\", \"/130\", \"/124\", \"/128\", \"/129\", \"/126\", \"/127\", \"/123\", \"/125\", \"/121\", \"/122\", \"/117\", \"/114\", \"/113\", \"/115\", \"/116\", \"/112\", \"/108\", \"/109\", \"/110\", \"/111\", \"/106\", \"/107\", \"/103\", \"/104\", \"/105\", \"/97\", \"/98\", \"/99\", \"/96\", \"/95\", \"/93\", \"/94\", \"/91\", \"/92\", \"/89\", \"/90\", \"/86\", \"/87\", \"/88\", \"/85\", \"/80\", \"/81\", \"/79\", \"/77\", \"/78\", \"/73\", \"/71\", \"/72\", \"/74\", \"/75\", \"/76\", \"/69\", \"/70\", \"/67\", \"/68\", \"/65\", \"/66\", \"/64\", \"/60\", \"/59\", \"/56\", \"/54\", \"/55\", \"/57\", \"/58\", \"/50\", \"/49\", \"/48\", \"/47\", \"/51\", \"/52\", \"/53\", \"/46\", \"/40\", \"/41\", \"/42\", \"/38\", \"/39\", \"/37\", \"/36\", \"/33\", \"/34\", \"/35\", \"/32\", \"/31\", \"/30\", \"/29\", \"/28\", \"/22\", \"/23\", \"/24\", \"/21\", \"/19\", \"/20\", \"/18\", \"/16\", \"/17\", \"/15\", \"/14\", \"/13\", \"/12\", \"/11\", \"/10\", \"/4\", \"/5\", \"/6\", \"/3\", \"/2\", \"/1\"]"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-71",
					"linecount" : 6,
					"maxclass" : "o.compose",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 138.5, 948.0, 275.0, 92.0 ],
					"saved_bundle_data" : [ 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -88, 47, 97, 100, 100, 114, 0, 0, 0, 44, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 0, 0, 0, 47, 49, 51, 56, 0, 0, 0, 0, 47, 49, 51, 55, 0, 0, 0, 0, 47, 49, 51, 54, 0, 0, 0, 0, 47, 49, 50, 48, 0, 0, 0, 0, 47, 49, 49, 57, 0, 0, 0, 0, 47, 49, 49, 56, 0, 0, 0, 0, 47, 49, 48, 48, 0, 0, 0, 0, 47, 49, 48, 50, 0, 0, 0, 0, 47, 49, 48, 49, 0, 0, 0, 0, 47, 56, 51, 0, 47, 56, 52, 0, 47, 56, 50, 0, 47, 54, 49, 0, 47, 54, 50, 0, 47, 54, 51, 0, 47, 52, 53, 0, 47, 52, 52, 0, 47, 52, 51, 0, 47, 50, 55, 0, 47, 50, 54, 0, 47, 50, 53, 0, 47, 57, 0, 0, 47, 55, 0, 0, 47, 56, 0, 0 ],
					"saved_bundle_length" : 188,
					"text" : "/addr : [\"/138\", \"/137\", \"/136\", \"/120\", \"/119\", \"/118\", \"/100\", \"/102\", \"/101\", \"/83\", \"/84\", \"/82\", \"/61\", \"/62\", \"/63\", \"/45\", \"/44\", \"/43\", \"/27\", \"/26\", \"/25\", \"/9\", \"/7\", \"/8\"]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "FullPacket" ],
					"patching_rect" : [ 728.0, 880.0, 81.0, 22.0 ],
					"text" : "o.select /addr"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 573.0, 909.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 551.0, 1039.0, 37.0, 22.0 ],
					"text" : "o.dict"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-66",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 556.0, 1083.0, 50.5, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "FullPacket" ],
					"patching_rect" : [ 597.0, 968.0, 35.0, 22.0 ],
					"text" : "o.var"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 615.0, 893.0, 54.0, 22.0 ],
					"text" : "o.accum"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "FullPacket" ],
					"patching_rect" : [ 638.0, 853.0, 69.0, 22.0 ],
					"text" : "o.route /out"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-55",
					"linecount" : 20,
					"maxclass" : "o.expr.codebox",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "FullPacket", "FullPacket" ],
					"patching_rect" : [ 710.0, 539.5, 270.0, 304.0 ],
					"presentation_linecount" : 20,
					"text" : "/addr = \"/\"+int32(/id + 1), \n\n/sound./key = \"sound\",\n/val./new = \"Player\",\n\n/vars./autostart = \"false\",\n/vars./loop = \"false\",\n/call./method = \"toMaster\",\n\n/val./call = /call,\n\nmap(\n  lambda([a,file],\n    /vars./url = \"scores/jan/\"+file,\n    /val./id = \"the_mp3\",\n    /val./vars = /vars,\n    /sound./val = /val,\n    assign(\"/out\"+a, /sound)\n  ), /addr, /file\n)\n"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontsize" : 12.0,
					"id" : "obj-54",
					"linecount" : 26,
					"maxclass" : "o.compose",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 662.0, 972.0, 273.0, 364.0 ],
					"saved_bundle_data" : [ 35, 98, 117, 110, 100, 108, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -12, 47, 97, 100, 100, 114, 0, 0, 0, 44, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 0, 0, 0, 47, 49, 52, 52, 0, 0, 0, 0, 47, 49, 52, 50, 0, 0, 0, 0, 47, 49, 52, 49, 0, 0, 0, 0, 47, 49, 52, 51, 0, 0, 0, 0, 47, 49, 51, 57, 0, 0, 0, 0, 47, 49, 52, 48, 0, 0, 0, 0, 47, 49, 51, 51, 0, 0, 0, 0, 47, 49, 51, 50, 0, 0, 0, 0, 47, 49, 51, 49, 0, 0, 0, 0, 47, 49, 51, 52, 0, 0, 0, 0, 47, 49, 51, 53, 0, 0, 0, 0, 47, 49, 51, 48, 0, 0, 0, 0, 47, 49, 50, 52, 0, 0, 0, 0, 47, 49, 50, 56, 0, 0, 0, 0, 47, 49, 50, 57, 0, 0, 0, 0, 47, 49, 50, 54, 0, 0, 0, 0, 47, 49, 50, 55, 0, 0, 0, 0, 47, 49, 50, 51, 0, 0, 0, 0, 47, 49, 50, 53, 0, 0, 0, 0, 47, 49, 50, 49, 0, 0, 0, 0, 47, 49, 50, 50, 0, 0, 0, 0, 47, 49, 49, 55, 0, 0, 0, 0, 47, 49, 49, 52, 0, 0, 0, 0, 47, 49, 49, 51, 0, 0, 0, 0, 47, 49, 49, 53, 0, 0, 0, 0, 47, 49, 49, 54, 0, 0, 0, 0, 47, 49, 49, 50, 0, 0, 0, 0, 47, 49, 48, 56, 0, 0, 0, 0, 47, 49, 48, 57, 0, 0, 0, 0, 47, 49, 49, 48, 0, 0, 0, 0, 47, 49, 49, 49, 0, 0, 0, 0, 47, 49, 48, 54, 0, 0, 0, 0, 47, 49, 48, 55, 0, 0, 0, 0, 47, 49, 48, 51, 0, 0, 0, 0, 47, 49, 48, 52, 0, 0, 0, 0, 47, 49, 48, 53, 0, 0, 0, 0, 47, 57, 55, 0, 47, 57, 56, 0, 47, 57, 57, 0, 47, 57, 54, 0, 47, 57, 53, 0, 47, 57, 51, 0, 47, 57, 52, 0, 47, 57, 49, 0, 47, 57, 50, 0, 47, 56, 57, 0, 47, 57, 48, 0, 47, 56, 54, 0, 47, 56, 55, 0, 47, 56, 56, 0, 47, 56, 53, 0, 47, 56, 48, 0, 47, 56, 49, 0, 47, 55, 57, 0, 47, 55, 55, 0, 47, 55, 56, 0, 47, 55, 51, 0, 47, 55, 49, 0, 47, 55, 50, 0, 47, 55, 52, 0, 47, 55, 53, 0, 47, 55, 54, 0, 47, 54, 57, 0, 47, 55, 48, 0, 47, 54, 55, 0, 47, 54, 56, 0, 47, 54, 53, 0, 47, 54, 54, 0, 47, 54, 52, 0, 47, 54, 48, 0, 47, 53, 57, 0, 47, 53, 54, 0, 47, 53, 52, 0, 47, 53, 53, 0, 47, 53, 55, 0, 47, 53, 56, 0, 47, 53, 48, 0, 47, 52, 57, 0, 47, 52, 56, 0, 47, 52, 55, 0, 47, 53, 49, 0, 47, 53, 50, 0, 47, 53, 51, 0, 47, 52, 54, 0, 47, 52, 48, 0, 47, 52, 49, 0, 47, 52, 50, 0, 47, 51, 56, 0, 47, 51, 57, 0, 47, 51, 55, 0, 47, 51, 54, 0, 47, 51, 51, 0, 47, 51, 52, 0, 47, 51, 53, 0, 47, 51, 50, 0, 47, 51, 49, 0, 47, 51, 48, 0, 47, 50, 57, 0, 47, 50, 56, 0, 47, 50, 50, 0, 47, 50, 51, 0, 47, 50, 52, 0, 47, 50, 49, 0, 47, 49, 57, 0, 47, 50, 48, 0, 47, 49, 56, 0, 47, 49, 54, 0, 47, 49, 55, 0, 47, 49, 53, 0, 47, 49, 52, 0, 47, 49, 51, 0, 47, 49, 50, 0, 47, 49, 49, 0, 47, 49, 48, 0, 47, 52, 0, 0, 47, 53, 0, 0, 47, 54, 0, 0, 47, 51, 0, 0, 47, 50, 0, 0, 47, 49, 0, 0 ],
					"saved_bundle_length" : 776,
					"text" : "/addr : [\"/144\", \"/142\", \"/141\", \"/143\", \"/139\", \"/140\", \"/133\", \"/132\", \"/131\", \"/134\", \"/135\", \"/130\", \"/124\", \"/128\", \"/129\", \"/126\", \"/127\", \"/123\", \"/125\", \"/121\", \"/122\", \"/117\", \"/114\", \"/113\", \"/115\", \"/116\", \"/112\", \"/108\", \"/109\", \"/110\", \"/111\", \"/106\", \"/107\", \"/103\", \"/104\", \"/105\", \"/97\", \"/98\", \"/99\", \"/96\", \"/95\", \"/93\", \"/94\", \"/91\", \"/92\", \"/89\", \"/90\", \"/86\", \"/87\", \"/88\", \"/85\", \"/80\", \"/81\", \"/79\", \"/77\", \"/78\", \"/73\", \"/71\", \"/72\", \"/74\", \"/75\", \"/76\", \"/69\", \"/70\", \"/67\", \"/68\", \"/65\", \"/66\", \"/64\", \"/60\", \"/59\", \"/56\", \"/54\", \"/55\", \"/57\", \"/58\", \"/50\", \"/49\", \"/48\", \"/47\", \"/51\", \"/52\", \"/53\", \"/46\", \"/40\", \"/41\", \"/42\", \"/38\", \"/39\", \"/37\", \"/36\", \"/33\", \"/34\", \"/35\", \"/32\", \"/31\", \"/30\", \"/29\", \"/28\", \"/22\", \"/23\", \"/24\", \"/21\", \"/19\", \"/20\", \"/18\", \"/16\", \"/17\", \"/15\", \"/14\", \"/13\", \"/12\", \"/11\", \"/10\", \"/4\", \"/5\", \"/6\", \"/3\", \"/2\", \"/1\"]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "FullPacket" ],
					"patching_rect" : [ 710.0, 509.5, 82.0, 22.0 ],
					"text" : "o.pack /id /file"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 710.0, 473.5, 56.0, 22.0 ],
					"text" : "zl.delace"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 335.0, 159.0, 66.0, 22.0 ],
					"text" : "route bang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 638.0, 363.0, 32.0, 22.0 ],
					"text" : "print"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 454.0, 194.0, 54.0, 22.0 ],
					"text" : "deferlow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 331.5, 361.0, 29.5, 22.0 ],
					"text" : "+ 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 345.5, 472.0, 51.0, 22.0 ],
					"text" : "zl.group"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 345.5, 416.0, 39.0, 22.0 ],
					"text" : "$1 $3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"linecount" : 24,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 451.5, 509.5, 136.5, 330.0 ],
					"presentation_linecount" : 6,
					"text" : "137. vogel_01.mp3 136. vogel_01.mp3 135. vogel_01.mp3 119. vogel_01.mp3 118. vogel_01.mp3 117. vogel_01.mp3 99. vogel_01.mp3 101. vogel_01.mp3 100. vogel_01.mp3 82. vogel_01.mp3 83. vogel_01.mp3 81. vogel_01.mp3 60. vogel_01.mp3 61. vogel_01.mp3 62. vogel_01.mp3 44. vogel_01.mp3 43. vogel_01.mp3 42. vogel_01.mp3 26. vogel_01.mp3 25. vogel_01.mp3 24. vogel_01.mp3 8. vogel_01.mp3 6. vogel_01.mp3 7. vogel_01.mp3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"linecount" : 30,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 710.0, 43.0, 430.0, 411.0 ],
					"text" : "143. vogel_02.mp3 141. vogel_02.mp3 140. vogel_03.mp3 142. vogel_02.mp3 138. vogel_03.mp3 139. vogel_03.mp3 132. vogel_04.mp3 131. vogel_05.mp3 130. vogel_05.mp3 133. vogel_04.mp3 134. vogel_04.mp3 129. vogel_05.mp3 123. vogel_02.mp3 127. vogel_06.mp3 128. vogel_06.mp3 125. vogel_02.mp3 126. vogel_06.mp3 122. vogel_03.mp3 124. vogel_02.mp3 120. vogel_03.mp3 121. vogel_03.mp3 116. vogel_04.mp3 113. vogel_05.mp3 112. vogel_05.mp3 114. vogel_04.mp3 115. vogel_04.mp3 111. vogel_05.mp3 107. vogel_02.mp3 108. vogel_06.mp3 109. vogel_06.mp3 110. vogel_06.mp3 105. vogel_02.mp3 106. vogel_02.mp3 102. vogel_03.mp3 103. vogel_03.mp3 104. vogel_03.mp3 96. vogel_04.mp3 97. vogel_04.mp3 98. vogel_04.mp3 95. vogel_05.mp3 94. vogel_05.mp3 92. vogel_06.mp3 93. vogel_05.mp3 90. vogel_06.mp3 91. vogel_06.mp3 88. vogel_02.mp3 89. vogel_02.mp3 85. vogel_03.mp3 86. vogel_03.mp3 87. vogel_02.mp3 84. vogel_03.mp3 79. vogel_04.mp3 80. vogel_04.mp3 78. vogel_04.mp3 76. vogel_05.mp3 77. vogel_05.mp3 72. vogel_06.mp3 70. vogel_06.mp3 71. vogel_06.mp3 73. vogel_06.mp3 74. vogel_06.mp3 75. vogel_05.mp3 68. vogel_05.mp3 69. vogel_06.mp3 66. vogel_05.mp3 67. vogel_05.mp3 64. vogel_04.mp3 65. vogel_04.mp3 63. vogel_04.mp3 59. vogel_03.mp3 58. vogel_03.mp3 55. vogel_02.mp3 53. vogel_06.mp3 54. vogel_02.mp3 56. vogel_02.mp3 57. vogel_03.mp3 49. vogel_05.mp3 48. vogel_05.mp3 47. vogel_04.mp3 46. vogel_04.mp3 50. vogel_05.mp3 51. vogel_06.mp3 52. vogel_06.mp3 45. vogel_04.mp3 39. vogel_03.mp3 40. vogel_03.mp3 41. vogel_03.mp3 37. vogel_02.mp3 38. vogel_02.mp3 36. vogel_02.mp3 35. vogel_06.mp3 32. vogel_05.mp3 33. vogel_06.mp3 34. vogel_06.mp3 31. vogel_05.mp3 30. vogel_05.mp3 29. vogel_04.mp3 28. vogel_04.mp3 27. vogel_04.mp3 21. vogel_03.mp3 22. vogel_03.mp3 23. vogel_03.mp3 20. vogel_02.mp3 18. vogel_02.mp3 19. vogel_02.mp3 17. vogel_06.mp3 15. vogel_06.mp3 16. vogel_06.mp3 14. vogel_05.mp3 13. vogel_05.mp3 12. vogel_05.mp3 11. vogel_04.mp3 10. vogel_04.mp3 9. vogel_04.mp3 3. vogel_03.mp3 4. vogel_03.mp3 5. vogel_03.mp3 2. vogel_02.mp3 1. vogel_02.mp3 0. vogel_02.mp3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "int" ],
					"patching_rect" : [ 335.0, 313.0, 29.5, 22.0 ],
					"text" : "t b i"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "" ],
					"patching_rect" : [ 449.0, 151.0, 29.5, 22.0 ],
					"text" : "t b l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 427.5, 426.0, 39.0, 22.0 ],
					"text" : "$1 $3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 427.5, 472.0, 51.0, 22.0 ],
					"text" : "zl.group"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 345.5, 392.0, 42.0, 22.0 ],
					"text" : "gate 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 368.0, 361.0, 38.0, 22.0 ],
					"text" : "zl.reg"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 525.0, 194.0, 61.0, 22.0 ],
					"text" : "unjoin 4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 335.0, 214.0, 55.0, 22.0 ],
					"text" : "zl.slice 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 335.0, 251.0, 49.0, 22.0 ],
					"text" : "== 97.5"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 335.0, 124.0, 55.0, 22.0 ],
					"text" : "route set"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 492.0, 54.0, 39.0, 22.0 ],
					"text" : "dump"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 338.5, 28.0, 33.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "bang", "int" ],
					"patching_rect" : [ 335.0, 82.0, 40.0, 22.0 ],
					"text" : "text"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 1 ],
					"source" : [ "obj-29", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 1 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"source" : [ "obj-32", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 1 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-37", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-39", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 1 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"order" : 0,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"order" : 1,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"source" : [ "obj-49", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 1 ],
					"source" : [ "obj-50", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"source" : [ "obj-56", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 1 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 1 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-75", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-72", 0 ],
					"source" : [ "obj-76", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"source" : [ "obj-77", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 0 ],
					"order" : 1,
					"source" : [ "obj-79", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"order" : 0,
					"source" : [ "obj-79", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-85", 0 ],
					"source" : [ "obj-80", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-80", 0 ],
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 1 ],
					"source" : [ "obj-83", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "o.accum.maxpat",
				"bootpath" : "~/Documents/dev-lib/CNMAT-odot/patchers/namespace",
				"patcherrelativepath" : "../CNMAT-odot/patchers/namespace",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "o.pack.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.compose.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.expr.codebox.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.route.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.union.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.var.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.dict.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.select.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "black on white",
				"number" : 				{
					"fontsize" : [ 12.0 ],
					"textcolor_inverse" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"umenu" : 				{
					"textcolor_inverse" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
					"bgfillcolor" : 					{
						"type" : "color",
						"color1" : [ 0.862745, 0.870588, 0.878431, 1.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color" : [ 1.0, 1.0, 1.0, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "caption text",
				"default" : 				{
					"fontface" : [ 2 ],
					"fontsize" : [ 11.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "section dividers",
				"default" : 				{
					"fontface" : [ 3 ],
					"fontsize" : [ 15.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "section info reg",
				"default" : 				{
					"fontsize" : [ 12.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "titles",
				"default" : 				{
					"fontface" : [ 1 ],
					"fontsize" : [ 20.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
