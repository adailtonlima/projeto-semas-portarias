import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAjuda } from 'app/entities/ajuda/ajuda.model';
import { AjudaService } from 'app/entities/ajuda/service/ajuda.service';
import { IAssunto } from 'app/entities/assunto/assunto.model';
import { AssuntoService } from 'app/entities/assunto/service/assunto.service';
import { ITopico } from '../topico.model';
import { TopicoService } from '../service/topico.service';
import { TopicoFormService } from './topico-form.service';

import { TopicoUpdateComponent } from './topico-update.component';

describe('Topico Management Update Component', () => {
  let comp: TopicoUpdateComponent;
  let fixture: ComponentFixture<TopicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let topicoFormService: TopicoFormService;
  let topicoService: TopicoService;
  let ajudaService: AjudaService;
  let assuntoService: AssuntoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TopicoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TopicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TopicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    topicoFormService = TestBed.inject(TopicoFormService);
    topicoService = TestBed.inject(TopicoService);
    ajudaService = TestBed.inject(AjudaService);
    assuntoService = TestBed.inject(AssuntoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ajuda query and add missing value', () => {
      const topico: ITopico = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const ajudas: IAjuda[] = [{ id: '60ed0426-c48b-4d15-ac67-b5d5b8a09a07' }];
      topico.ajudas = ajudas;

      const ajudaCollection: IAjuda[] = [{ id: '8a8fe9bb-46a5-4de8-8286-e554913a28b3' }];
      jest.spyOn(ajudaService, 'query').mockReturnValue(of(new HttpResponse({ body: ajudaCollection })));
      const additionalAjudas = [...ajudas];
      const expectedCollection: IAjuda[] = [...additionalAjudas, ...ajudaCollection];
      jest.spyOn(ajudaService, 'addAjudaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ topico });
      comp.ngOnInit();

      expect(ajudaService.query).toHaveBeenCalled();
      expect(ajudaService.addAjudaToCollectionIfMissing).toHaveBeenCalledWith(
        ajudaCollection,
        ...additionalAjudas.map(expect.objectContaining),
      );
      expect(comp.ajudasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assunto query and add missing value', () => {
      const topico: ITopico = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const assuntos: IAssunto[] = [{ id: 29167 }];
      topico.assuntos = assuntos;

      const assuntoCollection: IAssunto[] = [{ id: 7739 }];
      jest.spyOn(assuntoService, 'query').mockReturnValue(of(new HttpResponse({ body: assuntoCollection })));
      const additionalAssuntos = [...assuntos];
      const expectedCollection: IAssunto[] = [...additionalAssuntos, ...assuntoCollection];
      jest.spyOn(assuntoService, 'addAssuntoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ topico });
      comp.ngOnInit();

      expect(assuntoService.query).toHaveBeenCalled();
      expect(assuntoService.addAssuntoToCollectionIfMissing).toHaveBeenCalledWith(
        assuntoCollection,
        ...additionalAssuntos.map(expect.objectContaining),
      );
      expect(comp.assuntosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const topico: ITopico = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const ajudas: IAjuda = { id: '7526e0ae-16e2-429c-b6db-11dc3fdb7cd7' };
      topico.ajudas = [ajudas];
      const assuntos: IAssunto = { id: 10912 };
      topico.assuntos = [assuntos];

      activatedRoute.data = of({ topico });
      comp.ngOnInit();

      expect(comp.ajudasSharedCollection).toContain(ajudas);
      expect(comp.assuntosSharedCollection).toContain(assuntos);
      expect(comp.topico).toEqual(topico);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITopico>>();
      const topico = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(topicoFormService, 'getTopico').mockReturnValue(topico);
      jest.spyOn(topicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ topico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: topico }));
      saveSubject.complete();

      // THEN
      expect(topicoFormService.getTopico).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(topicoService.update).toHaveBeenCalledWith(expect.objectContaining(topico));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITopico>>();
      const topico = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(topicoFormService, 'getTopico').mockReturnValue({ id: null });
      jest.spyOn(topicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ topico: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: topico }));
      saveSubject.complete();

      // THEN
      expect(topicoFormService.getTopico).toHaveBeenCalled();
      expect(topicoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITopico>>();
      const topico = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(topicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ topico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(topicoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAjuda', () => {
      it('Should forward to ajudaService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(ajudaService, 'compareAjuda');
        comp.compareAjuda(entity, entity2);
        expect(ajudaService.compareAjuda).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAssunto', () => {
      it('Should forward to assuntoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assuntoService, 'compareAssunto');
        comp.compareAssunto(entity, entity2);
        expect(assuntoService.compareAssunto).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
